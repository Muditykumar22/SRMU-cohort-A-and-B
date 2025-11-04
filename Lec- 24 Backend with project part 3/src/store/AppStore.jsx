import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api.js'

const STORAGE_KEY = 'shoplite_state_v1'

const defaultProducts = []

const StoreContext = createContext(null)

function readPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writePersistedState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore
  }
}

export function AppStoreProvider({ children }) {
  const persisted = readPersistedState()
  const [products, setProducts] = useState(persisted?.products || defaultProducts)
  const [cartItems, setCartItems] = useState(persisted?.cartItems || []) // [{id, qty}]
  const [orders, setOrders] = useState(persisted?.orders || [])
  const [user, setUser] = useState(persisted?.user || null) // {id, name, email, role}
  const [token, setToken] = useState(persisted?.token || null)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    writePersistedState({ products, cartItems, orders, user, token })
  }, [products, cartItems, orders, user, token])

  // Initial load: fetch products
  useEffect(() => {
    async function loadProducts() {
      try {
        const list = await apiFetch('/api/products')
        setProducts(list)
      } catch {
        // keep default empty on failure
      }
    }
    loadProducts()
  }, [])

  function notify(message, type = 'info') {
    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => dismissNotification(id), 2500)
  }

  function dismissNotification(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Catalog helpers
  function getProductById(id) {
    return products.find((p) => (p._id || p.id) === id) || null
  }

  // Cart
  function addToCart(productId, qty = 1) {
    setCartItems((prev) => {
      const found = prev.find((c) => c.id === productId)
      if (found) {
        return prev.map((c) => (c.id === productId ? { ...c, qty: c.qty + qty } : c))
      }
      return [...prev, { id: productId, qty }]
    })
    notify('Added to cart', 'success')
  }

  function updateCartQty(productId, qty) {
    setCartItems((prev) => prev.map((c) => (c.id === productId ? { ...c, qty } : c)))
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((c) => c.id !== productId))
  }

  function clearCart() {
    setCartItems([])
  }

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const p = getProductById(item.id)
      return sum + (p ? p.price * item.qty : 0)
    }, 0)
  }, [cartItems, products])

  // Auth
  async function login(email, password) {
    if (!email || !password) {
      notify('Enter email and password', 'error')
      return false
    }
    try {
      const resp = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } })
      setUser({ id: resp.user.id, name: resp.user.name, email: resp.user.email, role: resp.user.role })
      setToken(resp.token)
      notify('Logged in', 'success')
      return true
    } catch (e) {
      notify('Login failed', 'error')
      return false
    }
  }

  async function registerAccount(name, email, password) {
    if (!name || !email || !password) {
      notify('Enter name, email and password', 'error')
      return false
    }
    try {
      await apiFetch('/api/auth/register', { method: 'POST', body: { name, email, password } })
      // Auto-login after successful registration
      return await login(email, password)
    } catch (e) {
      notify('Registration failed', 'error')
      return false
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    notify('Logged out', 'info')
  }

  // Checkout
  async function placeOrder(shipping) {
    if (cartItems.length === 0) {
      notify('Cart is empty', 'error')
      return false
    }
    if (!token) {
      notify('Login required to place order', 'error')
      return false
    }
    try {
      const items = cartItems.map((c) => ({ product: c.id, qty: c.qty }))
      await apiFetch('/api/orders', { method: 'POST', token, body: { items, shipping } })
      // Refresh orders after placing
      await fetchOrders()
      clearCart()
      notify('Order placed!', 'success')
      return true
    } catch (e) {
      notify('Order failed', 'error')
      return false
    }
  }

  async function fetchOrders() {
    if (!token) return
    try {
      const list = await apiFetch('/api/orders', { token })
      setOrders(list)
    } catch {
      // ignore
    }
  }

  // Admin: basic product management
  function createProduct(product) {
    const id = 'tmp' + Date.now()
    setProducts((prev) => [{ _id: id, ...product }, ...prev])
    notify('Product created', 'success')
  }

  function updateProduct(id, updates) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
    notify('Product updated', 'success')
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    notify('Product deleted', 'info')
  }

  const value = {
    // state
    products,
    cartItems,
    orders,
    user,
    token,
    notifications,
    cartTotal,
    // actions
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getProductById,
    login,
    registerAccount,
    logout,
    placeOrder,
    fetchOrders,
    createProduct,
    updateProduct,
    deleteProduct,
    notify,
    dismissNotification,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}



import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'shoplite_state_v1'

const defaultProducts = [
  { id: 'p1', title: 'Basic T-Shirt', price: 499, image: 'https://picsum.photos/seed/t1/400/300', description: 'Comfortable cotton T-shirt for everyday wear.', stock: 20, category: 'Clothing' },
  { id: 'p2', title: 'Wireless Headphones', price: 2999, image: 'https://picsum.photos/seed/hp/400/300', description: 'Noise-isolating, lightweight, 20h battery life.', stock: 15, category: 'Electronics' },
  { id: 'p3', title: 'Coffee Mug', price: 249, image: 'https://picsum.photos/seed/mug/400/300', description: 'Ceramic mug, 350ml, dishwasher safe.', stock: 30, category: 'Home' },
  { id: 'p4', title: 'Notebook', price: 149, image: 'https://picsum.photos/seed/note/400/300', description: 'A5 dotted notebook with 120 pages.', stock: 25, category: 'Stationery' },
]

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
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    writePersistedState({ products, cartItems, orders, user })
  }, [products, cartItems, orders, user])

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
    return products.find((p) => p.id === id) || null
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

  // Auth (mock)
  function login(email, password) {
    if (!email || !password) {
      notify('Enter email and password', 'error')
      return false
    }
    const role = email.includes('admin') ? 'admin' : 'user'
    const newUser = { id: 'u1', name: role === 'admin' ? 'Admin' : 'User', email, role }
    setUser(newUser)
    notify('Logged in', 'success')
    return true
  }

  function logout() {
    setUser(null)
    notify('Logged out', 'info')
  }

  // Checkout
  function placeOrder(shipping) {
    if (cartItems.length === 0) {
      notify('Cart is empty', 'error')
      return false
    }
    const items = cartItems.map((c) => ({ ...c }))
    const total = cartTotal
    const id = 'o' + Date.now()
    setOrders((prev) => [{ id, items, total, date: new Date().toISOString(), shipping }, ...prev])
    clearCart()
    notify('Order placed!', 'success')
    return true
  }

  // Admin: basic product management
  function createProduct(product) {
    const id = 'p' + Date.now()
    setProducts((prev) => [{ id, ...product }, ...prev])
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
    notifications,
    cartTotal,
    // actions
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getProductById,
    login,
    logout,
    placeOrder,
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



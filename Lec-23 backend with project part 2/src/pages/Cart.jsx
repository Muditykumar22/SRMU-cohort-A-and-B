import { Link } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'

export default function Cart() {
  const { cartItems, updateCartQty, removeFromCart, getProductById, cartTotal, clearCart } = useAppStore()

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <h2>Your Cart</h2>
        <p>Cart is empty.</p>
        <Link className="btn" to="/">Go shopping</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map((item) => {
          const p = getProductById(item.id)
          if (!p) return null
          return (
            <div key={item.id} className="cart-row">
              <img src={p.image} alt={p.title} />
              <div className="cart-info">
                <div className="cart-title">{p.title}</div>
                <div>₹{p.price}</div>
              </div>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateCartQty(item.id, Number(e.target.value))}
              />
              <div className="cart-subtotal">₹{p.price * item.qty}</div>
              <button className="linklike" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          )
        })}
      </div>
      <div className="cart-actions">
        <div className="cart-total">Total: ₹{cartTotal}</div>
        <button className="btn secondary" onClick={clearCart}>Clear</button>
        <Link className="btn" to="/checkout">Checkout</Link>
      </div>
    </div>
  )
}



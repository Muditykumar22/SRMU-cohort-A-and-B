import { useEffect } from 'react'
import { useAppStore } from '../store/AppStore.jsx'

export default function Orders() {
  const { orders, fetchOrders, user } = useAppStore()
  useEffect(() => {
    if (user) fetchOrders()
  }, [user])
  return (
    <div className="container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders">
          {orders.map((o) => (
            <div key={o._id || o.id} className="order-card">
              <div className="order-row">
                <div>Order: {o._id || o.id}</div>
                <div>{new Date(o.createdAt || o.date).toLocaleString()}</div>
                <div>Total: ₹{o.total}</div>
              </div>
              <ul>
                {o.items.map((it, idx) => (
                  <li key={(it.product || it.id) + String(idx)}>{it.product || it.id} × {it.qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



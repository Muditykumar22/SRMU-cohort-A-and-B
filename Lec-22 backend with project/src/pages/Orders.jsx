import { useAppStore } from '../store/AppStore.jsx'

export default function Orders() {
  const { orders } = useAppStore()
  return (
    <div className="container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-row">
                <div>Order: {o.id}</div>
                <div>{new Date(o.date).toLocaleString()}</div>
                <div>Total: ₹{o.total}</div>
              </div>
              <ul>
                {o.items.map((it) => (
                  <li key={it.id + it.qty}>{it.id} × {it.qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}



import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'
import { useState } from 'react'

export default function Checkout() {
  const { placeOrder, user, notify } = useAppStore()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState({ name: '', address: '', phone: '' })

  function submit(e) {
    e.preventDefault()
    if (!user) {
      notify('Login required to place order', 'error')
      navigate('/login')
      return
    }
    const ok = placeOrder(shipping)
    if (ok) navigate('/orders')
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
        </label>
        <label>
          Address
          <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
        </label>
        <label>
          Phone
          <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
        </label>
        <button className="btn" type="submit">Place Order</button>
      </form>
    </div>
  )
}



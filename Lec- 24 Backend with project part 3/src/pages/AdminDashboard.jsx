import { useState } from 'react'
import { useAppStore } from '../store/AppStore.jsx'

export default function AdminDashboard() {
  const { user, products, createProduct, updateProduct, deleteProduct, notify } = useAppStore()
  const [form, setForm] = useState({ title: '', price: 0, image: '', description: '', stock: 0, category: '' })

  if (!user || user.role !== 'admin') {
    return <div className="container"><p>Admin access only.</p></div>
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title) { notify('Title required', 'error'); return }
    createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) })
    setForm({ title: '', price: 0, image: '', description: '', stock: 0, category: '' })
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <h3>Create Product</h3>
      <form className="form" onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn" type="submit">Create</button>
      </form>

      <h3>Products</h3>
      <div className="admin-list">
        {products.map((p) => (
          <div key={p.id} className="admin-row">
            <div className="grow">{p.title} — ₹{p.price}</div>
            <button className="btn small" onClick={() => updateProduct(p.id, { price: p.price + 10 })}>+₹10</button>
            <button className="btn small danger" onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}



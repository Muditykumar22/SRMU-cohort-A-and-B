import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'

export default function Register() {
  const { login, notify } = useAppStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function submit(e) {
    e.preventDefault()
    notify('Account created (mock)', 'success')
    const ok = login(form.email, form.password)
    if (ok) navigate('/')
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <button className="btn" type="submit">Create Account</button>
      </form>
    </div>
  )
}



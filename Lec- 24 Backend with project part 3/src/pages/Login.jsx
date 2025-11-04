import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'

export default function Login() {
  const { login } = useAppStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  async function submit(e) {
    e.preventDefault()
    const ok = await login(form.email, form.password)
    if (ok) navigate('/')
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <label>
          Email
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <button className="btn" type="submit">Login</button>
      </form>
      <p className="muted">Hint: Use an email with "admin" to become admin.</p>
    </div>
  )
}



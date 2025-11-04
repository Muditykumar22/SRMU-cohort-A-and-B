import { Link, NavLink } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'

export default function Header() {
  const { cartItems, user, logout } = useAppStore()
  const cartCount = cartItems.reduce((sum, c) => sum + c.qty, 0)

  return (
    <header className="header">
      <div className="container header-row">
        <Link to="/" className="brand">ShopLite</Link>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          {user ? (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              {user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
              <button className="linklike" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}



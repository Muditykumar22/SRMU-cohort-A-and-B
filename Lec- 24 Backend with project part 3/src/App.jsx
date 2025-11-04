import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Notification from './components/Notification.jsx'
import Catalog from './pages/Catalog.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Orders from './pages/Orders.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import { useAppStore } from './store/AppStore.jsx'

function Protected({ children }) {
  const { user } = useAppStore()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AdminOnly({ children }) {
  const { user } = useAppStore()
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/orders" element={<Protected><Orders /></Protected>} />
          <Route path="/admin" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Notification />
    </div>
  )
}

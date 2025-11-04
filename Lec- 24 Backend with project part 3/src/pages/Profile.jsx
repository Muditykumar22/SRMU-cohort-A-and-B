import { useAppStore } from '../store/AppStore.jsx'

export default function Profile() {
  const { user } = useAppStore()
  if (!user) return <div className="container"><p>Please login to view your profile.</p></div>
  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="profile-card">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
      </div>
    </div>
  )
}



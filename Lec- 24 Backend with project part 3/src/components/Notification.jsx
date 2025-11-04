import { useAppStore } from '../store/AppStore.jsx'

export default function Notification() {
  const { notifications, dismissNotification } = useAppStore()
  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div key={n.id} className={`toast toast-${n.type}`} onClick={() => dismissNotification(n.id)}>
          {n.message}
        </div>
      ))}
    </div>
  )
}



import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import './App.css'

const PostsContext = createContext(null)

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isActive = true
    async function fetchPosts() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }
        const data = await response.json()
        if (isActive) setPosts(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        if (isActive) setError(message)
      } finally {
        if (isActive) setLoading(false)
      }
    }
    fetchPosts()
    return () => {
      isActive = false
    }
  }, [reloadKey])

  const contextValue = useMemo(
    () => ({
      posts,
      loading,
      error,
      refetch: () => setReloadKey((k) => k + 1),
    }),
    [posts, loading, error]
  )

  function PostsList() {
    const ctx = useContext(PostsContext)
    if (!ctx) return null
    const { posts, loading, error, refetch } = ctx
    return (
      <div className="card" style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Posts</h2>
          <button onClick={refetch} disabled={loading}>
            {loading ? 'Loading…' : 'Reload'}
          </button>
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>Error: {error}</div>}
        {!loading && posts.length === 0 && !error && <div>No posts found.</div>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {posts.map((p) => (
            <li key={p.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{p.title}</div>
              <div style={{ color: '#555' }}>{p.body}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <PostsContext.Provider value={contextValue}>
      <h1 style={{ marginBottom: 12 }}>JSONPlaceholder + Context API</h1>
      <p className="read-the-docs" style={{ marginTop: 0, marginBottom: 20 }}>
        All logic lives in a single component file: <code>src/App.jsx</code>
      </p>
      <PostsList />
    </PostsContext.Provider>
  )
}

export default App



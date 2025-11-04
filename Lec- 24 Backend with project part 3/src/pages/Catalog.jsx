import ProductCard from '../components/ProductCard.jsx'
import { useAppStore } from '../store/AppStore.jsx'

export default function Catalog() {
  const { products } = useAppStore()
  return (
    <div className="container">
      <h2>Products</h2>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id || p.id} product={p} />
        ))}
      </div>
    </div>
  )
}



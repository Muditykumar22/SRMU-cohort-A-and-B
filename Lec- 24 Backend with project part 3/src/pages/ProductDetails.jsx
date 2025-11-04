import { useParams } from 'react-router-dom'
import { useAppStore } from '../store/AppStore.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { getProductById, addToCart } = useAppStore()
  const product = getProductById(id)
  if (!product) return <div className="container"><p>Product not found.</p></div>

  return (
    <div className="container detail">
      <img src={product.image} alt={product.title} className="detail-img" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <div className="detail-price">₹{product.price}</div>
        <p>{product.description}</p>
        <button className="btn" onClick={() => addToCart(product._id || product.id, 1)}>Add to Cart</button>
      </div>
    </div>
  )
}



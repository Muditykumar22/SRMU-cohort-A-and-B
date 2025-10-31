import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="card-imgwrap">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <div className="card-price">₹{product.price}</div>
        <Link className="btn" to={`/product/${product.id}`}>View</Link>
      </div>
    </div>
  )
}



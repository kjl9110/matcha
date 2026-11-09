import { Link } from 'react-router-dom'
import ProductBadges from './ProductBadges.jsx'
import './ProductCard.css'

function ProductCard({ product }) {
  const { id, image, alt, title, salePrice, hashtags } = product

  return (
    <Link to={`/product/${id}`} className="product-card">
      <ProductBadges product={product} />
      <img src={`/${image}`} alt={alt} />
      <p className="product-card__title">{title}</p>
      <p className="product-card__price">{salePrice.toLocaleString()}원</p>
      <p className="product-card__tags">{hashtags.join(' ')}</p>
    </Link>
  )
}

export default ProductCard

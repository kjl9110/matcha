import { Link } from 'react-router-dom'
import data from '../data/daehandawon_products.json'
import ProductListItem from '../components/ProductListItem.jsx'
import { useWishlist } from '../context/useWishlist.js'
import './Order.css'

function Wishlist() {
  const { ids } = useWishlist()
  const products = ids
    .map((id) => data.products.find((product) => product.id === id))
    .filter(Boolean)

  if (products.length === 0) {
    return (
      <section className="order-page order-empty">
        <h2 className="order-page__title">찜한 상품</h2>
        <p>아직 찜한 상품이 없어요.</p>
        <Link to="/products" className="order-button">상품 보러 가기</Link>
      </section>
    )
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">찜한 상품 ({products.length})</h2>
      <ul className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}

export default Wishlist

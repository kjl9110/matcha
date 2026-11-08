import { Link } from 'react-router-dom'
import data from '../data/daehandawon_products.json'
import SectionTitle from './SectionTitle.jsx'
import ProductListItem from './ProductListItem.jsx'
import './VideoProducts.css'

// 시안의 '영상 속 추천상품' 3개
const productIds = ['DH-007', 'DH-008', 'DH-009']
const products = data.products.filter((product) => productIds.includes(product.id))

function VideoProducts() {
  return (
    <section className="video-products section--divided">
      <SectionTitle title="영상 속 추천상품" />
      <Link to="/product/DH-001">
        <img
          className="video-products__banner"
          src="/images/banner 03.png"
          alt="대한다원 녹차라떼, 차밭의 초록을 따뜻한 한 잔으로"
        />
      </Link>
      <ul className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}

export default VideoProducts

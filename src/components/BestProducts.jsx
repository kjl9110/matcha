import { useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/daehandawon_products.json'
import SectionTitle from './SectionTitle.jsx'
import ProductListItem from './ProductListItem.jsx'
import './BestProducts.css'

const tabs = [
  {
    label: '활력충전집중',
    banner: '/images/banner 02.jpg',
    bannerAlt: '입하 2026년산 봉로녹차, 여름의 문턱에 만나는 녹차 6,000원',
    bannerTo: '/product/DH-004',
    filter: (product) => product.category === '잎차·티백',
  },
  {
    label: '지역특산물',
    banner: '/images/banner 04.png',
    bannerAlt: '간편한 한 잔 녹차 티백 5,500원',
    bannerTo: '/product/DH-006',
    filter: (product) => product.origin.includes('보성'),
  },
  {
    label: '유기농제품',
    banner: '/images/banner-05.jpg',
    bannerAlt: '보성산 유기농 가루녹차 18,000원',
    bannerTo: '/product/DH-007',
    filter: (product) => product.title.includes('유기농'),
  },
]

function BestProducts() {
  const [active, setActive] = useState(0)
  const tab = tabs[active]
  const products = data.products.filter(tab.filter).slice(0, 3)

  return (
    <section className="best-products">
      <SectionTitle title="베스트상품" />
      <div className="best-products__tabs" role="tablist">
        {tabs.map(({ label }, index) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? 'is-active' : ''}
            onClick={() => setActive(index)}
          >
            {label}
          </button>
        ))}
      </div>
      <Link to={tab.bannerTo}>
        <img className="best-products__banner" src={tab.banner} alt={tab.bannerAlt} />
      </Link>
      <ul className="product-list">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  )
}

export default BestProducts

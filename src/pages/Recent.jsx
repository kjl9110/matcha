import { useState } from 'react'
import { Link } from 'react-router-dom'
import data from '../data/daehandawon_products.json'
import ProductCard from '../components/ProductCard.jsx'
import { RECENT_KEY, readList, writeList } from '../utils/localStore.js'
import './Order.css'
import './Pages.css'

function Recent() {
  const [ids, setIds] = useState(() => readList(RECENT_KEY))
  const products = ids
    .map((id) => data.products.find((product) => product.id === id))
    .filter(Boolean)

  const clear = () => {
    writeList(RECENT_KEY, [])
    setIds([])
  }

  if (products.length === 0) {
    return (
      <section className="order-page order-empty">
        <h2 className="order-page__title">최근 본 상품</h2>
        <p>아직 본 상품이 없어요.</p>
        <Link to="/products" className="order-button">상품 보러 가기</Link>
      </section>
    )
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">최근 본 상품</h2>
      <ul className="page-grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <button type="button" className="page-text-button" onClick={clear}>기록 지우기</button>
    </section>
  )
}

export default Recent

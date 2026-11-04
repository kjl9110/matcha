import { useState } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'
import data from '../data/daehandawon_products.json'
import ProductCard from './ProductCard.jsx'
import './SectionTitle.css'
import './AllProducts.css'

const PAGE_SIZE = 8
const categories = ['전체', ...new Set(data.products.map((product) => product.category))]

// 대소문자·띄어쓰기 무시
const normalize = (text) => text.toLowerCase().replace(/\s/g, '')

const matches = (product, keyword) =>
  [product.title, product.category, product.description, ...product.hashtags]
    .some((text) => normalize(text).includes(keyword))

function AllProducts() {
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const [count, setCount] = useState(PAGE_SIZE)

  const keyword = normalize(query)
  const products = data.products
    .filter((product) => category === '전체' || product.category === category)
    .filter((product) => !keyword || matches(product, keyword))
  const visible = products.slice(0, count)

  const selectCategory = (name) => {
    setCategory(name)
    setCount(PAGE_SIZE)
  }

  const changeQuery = (value) => {
    setQuery(value)
    setCount(PAGE_SIZE)
  }

  return (
    <section className="all-products section--divided">
      <div className="all-products__head">
        <h2 className="section-title__text">전체상품</h2>
        <div className="all-products__search">
          <IoSearch aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => changeQuery(e.target.value)}
            placeholder="상품명·태그 검색"
            aria-label="전체상품 검색"
          />
          {query && (
            <button type="button" aria-label="검색어 지우기" onClick={() => changeQuery('')}>
              <IoClose />
            </button>
          )}
        </div>
      </div>
      <div className="all-products__tabs" role="tablist">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={name === category}
            className={name === category ? 'is-active' : ''}
            onClick={() => selectCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {keyword && (
        <p className="all-products__result" aria-live="polite">
          '{query.trim()}' 검색 결과 {products.length}개
        </p>
      )}
      {products.length === 0 ? (
        <p className="all-products__empty">검색 결과가 없습니다.</p>
      ) : (
        <ul className="all-products__grid">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
      {count < products.length && (
        <button
          type="button"
          className="all-products__more"
          onClick={() => setCount(count + PAGE_SIZE)}
        >
          더보기 ({visible.length}/{products.length})
        </button>
      )}
    </section>
  )
}

export default AllProducts

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { IoSearch, IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import data from '../data/daehandawon_products.json'
import ProductCard from './ProductCard.jsx'
import './SectionTitle.css'
import './AllProducts.css'

const PAGE_SIZE = 8
const categories = ['전체', ...new Set(data.products.map((product) => product.category))]

const SORTS = [
  { value: 'default', label: '기본순', compare: () => 0 },
  { value: 'reviews', label: '리뷰 많은순', compare: (a, b) => b.reviewCount - a.reviewCount },
  { value: 'rating', label: '평점 높은순', compare: (a, b) => b.rating - a.rating },
  { value: 'low', label: '낮은 가격순', compare: (a, b) => a.salePrice - b.salePrice },
  { value: 'high', label: '높은 가격순', compare: (a, b) => b.salePrice - a.salePrice },
]

// 대소문자·띄어쓰기 무시
const normalize = (text) => text.toLowerCase().replace(/\s/g, '')

const matches = (product, keyword) =>
  [product.title, product.category, product.description, ...product.hashtags]
    .some((text) => normalize(text).includes(keyword))

function AllProducts({ initialCategory = '전체', initialQuery = '', autoFocus = false }) {
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState(initialQuery)
  const [count, setCount] = useState(PAGE_SIZE)
  const [sort, setSort] = useState('default')
  const [tabSwiper, setTabSwiper] = useState(null)
  const [tabEdge, setTabEdge] = useState({ start: true, end: false })

  const keyword = normalize(query)
  const products = data.products
    .filter((product) => category === '전체' || product.category === category)
    .filter((product) => !keyword || matches(product, keyword))
    .sort(SORTS.find(({ value }) => value === sort).compare)
  const visible = products.slice(0, count)

  const changeSort = (value) => {
    setSort(value)
    setCount(PAGE_SIZE)
  }

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
            autoFocus={autoFocus}
          />
          {query && (
            <button type="button" aria-label="검색어 지우기" onClick={() => changeQuery('')}>
              <IoClose />
            </button>
          )}
        </div>
      </div>
      {/* 카테고리 탭: 마우스로 끌거나 양옆 화살표로 넘김 */}
      <div className="all-products__tabs">
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          onSwiper={setTabSwiper}
          onProgress={(swiper) => setTabEdge({ start: swiper.isBeginning, end: swiper.isEnd })}
          role="tablist"
        >
          {categories.map((name) => (
            <SwiperSlide key={name}>
              <button
                type="button"
                role="tab"
                aria-selected={name === category}
                className={name === category ? 'is-active' : ''}
                onClick={() => selectCategory(name)}
              >
                {name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {!tabEdge.start && (
          <button
            type="button"
            className="all-products__tab-arrow all-products__tab-arrow--prev"
            aria-label="이전 카테고리"
            onClick={() => tabSwiper?.slidePrev()}
          >
            <IoChevronBack />
          </button>
        )}
        {!tabEdge.end && (
          <button
            type="button"
            className="all-products__tab-arrow all-products__tab-arrow--next"
            aria-label="다음 카테고리"
            onClick={() => tabSwiper?.slideNext()}
          >
            <IoChevronForward />
          </button>
        )}
      </div>
      <div className="all-products__sort">
        <select
          value={sort}
          aria-label="상품 정렬"
          onChange={(e) => changeSort(e.target.value)}
        >
          {SORTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
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

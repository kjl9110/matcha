import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import './CategoryIcons.css'

// category: 상품 데이터의 카테고리로 이동, 없으면 이름으로 검색
const categories = [
  { icon: '/images/icon01.png', label: '선물세트', category: '선물세트·다구' },
  { icon: '/images/icon02.png', label: '우전' },
  { icon: '/images/icon03.png', label: '세작' },
  { icon: '/images/icon04.png', label: '중작' },
  { icon: '/images/icon05.png', label: '대작' },
  { icon: '/images/icon06.png', label: '발효녹차' },
  { icon: '/images/icon07.png', label: '말차·가루녹차', category: '가루녹차·말차' },
  { icon: '/images/icon08.png', label: '티백' },
]

const makeLink = ({ label, category }) =>
  category
    ? `/products?category=${encodeURIComponent(category)}`
    : `/products?q=${encodeURIComponent(label)}`

function CategoryIcons() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="category-icons">
      <Swiper slidesPerView="auto" spaceBetween={8} onSwiper={setSwiper}>
        {categories.map((item) => (
          <SwiperSlide key={item.label}>
            <Link to={makeLink(item)} className="category-icons__card">
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="category-icons__next"
        aria-label="다음 카테고리"
        onClick={() => swiper?.slideNext()}
      >
        <IoChevronForward />
      </button>
    </section>
  )
}

export default CategoryIcons

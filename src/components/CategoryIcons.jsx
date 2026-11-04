import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import './CategoryIcons.css'

const categories = [
  { icon: '/images/icon01.png', label: '선물세트' },
  { icon: '/images/icon02.png', label: '우전' },
  { icon: '/images/icon03.png', label: '세작' },
  { icon: '/images/icon04.png', label: '중작' },
  { icon: '/images/icon05.png', label: '대작' },
  { icon: '/images/icon06.png', label: '발효녹차' },
  { icon: '/images/icon07.png', label: '말차·가루녹차' },
  { icon: '/images/icon08.png', label: '티백' },
]

function CategoryIcons() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="category-icons">
      <Swiper slidesPerView="auto" spaceBetween={8} onSwiper={setSwiper}>
        {categories.map(({ icon, label }) => (
          <SwiperSlide key={label}>
            <a href="#" className="category-icons__card">
              <img src={icon} alt="" />
              <span>{label}</span>
            </a>
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

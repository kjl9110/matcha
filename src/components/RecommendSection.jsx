import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import data from '../data/daehandawon_products.json'
import SectionTitle from './SectionTitle.jsx'
import ProductCard from './ProductCard.jsx'
import './RecommendSection.css'

const bestProducts = data.products.filter((product) => product.badge === 'BEST')

function RecommendSection() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="recommend">
      <SectionTitle title="추천상품" subtitle="가장 사랑을 많이 받은 제품" />
      <div className="recommend__slider">
        <Swiper slidesPerView={3} spaceBetween={8} onSwiper={setSwiper}>
          {bestProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className="recommend__arrow recommend__arrow--prev"
          aria-label="이전 상품"
          onClick={() => swiper?.slidePrev()}
        >
          <IoChevronBack />
        </button>
        <button
          type="button"
          className="recommend__arrow recommend__arrow--next"
          aria-label="다음 상품"
          onClick={() => swiper?.slideNext()}
        >
          <IoChevronForward />
        </button>
      </div>
    </section>
  )
}

export default RecommendSection

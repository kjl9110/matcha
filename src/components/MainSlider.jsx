import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import 'swiper/css/pagination'
import './MainSlider.css'

const slides = [
  { image: '/images/banner 01.png', alt: '대한다원 2026년산 처음딴차 세트 134,300원', to: '/product/DH-003' },
  { image: '/images/banner 04.png', alt: '간편한 한 잔 녹차 티백 5,500원', to: '/product/DH-006' },
  { image: '/images/banner-05.jpg', alt: '보성산 유기농 가루녹차, 라떼와 베이킹까지 18,000원', to: '/product/DH-007' },
  { image: '/images/banner 06.png', alt: '녹차라떼 분말 16포 구성 7,000원', to: '/product/DH-001' },
]

function MainSlider() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="main-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        onSwiper={setSwiper}
      >
        {slides.map(({ image, alt, to }) => (
          <SwiperSlide key={image}>
            <Link to={to}>
              <img src={image} alt={alt} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="main-slider__arrow main-slider__arrow--prev"
        aria-label="이전 배너"
        onClick={() => swiper?.slidePrev()}
      >
        <IoChevronBack />
      </button>
      <button
        type="button"
        className="main-slider__arrow main-slider__arrow--next"
        aria-label="다음 배너"
        onClick={() => swiper?.slideNext()}
      >
        <IoChevronForward />
      </button>
    </section>
  )
}

export default MainSlider

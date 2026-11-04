import MainSlider from '../components/MainSlider.jsx'
import CategoryIcons from '../components/CategoryIcons.jsx'
import RecommendSection from '../components/RecommendSection.jsx'
import CouponBanner from '../components/CouponBanner.jsx'
import BestProducts from '../components/BestProducts.jsx'
import VideoProducts from '../components/VideoProducts.jsx'
import AllProducts from '../components/AllProducts.jsx'
import EventSection from '../components/EventSection.jsx'
import ReviewSection from '../components/ReviewSection.jsx'

function Home() {
  return (
    <>
      <MainSlider />
      <CategoryIcons />
      <RecommendSection />
      <CouponBanner />
      <BestProducts />
      <VideoProducts />
      <AllProducts />
      <EventSection />
      <ReviewSection />
    </>
  )
}

export default Home

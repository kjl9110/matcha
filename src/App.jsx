import { useEffect } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import BackBar from './components/BackBar.jsx'
import Footer from './components/Footer.jsx'
import BottomNav from './components/BottomNav.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFail from './pages/PaymentFail.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import FindAccount from './pages/FindAccount.jsx'
import MyPage from './pages/MyPage.jsx'
import Products from './pages/Products.jsx'
import Recent from './pages/Recent.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Menu from './pages/Menu.jsx'
import Reviews from './pages/Reviews.jsx'
import { EventList, EventDetail } from './pages/Events.jsx'
import Info from './pages/Info.jsx'
import Contact from './pages/Contact.jsx'
import Consult from './pages/Consult.jsx'
import NotFound from './pages/NotFound.jsx'
import Story from './pages/Story.jsx'
import { getPageTitle } from './utils/pageTitle.js'
import './App.css'

function App() {
  const { pathname } = useLocation()

  // 페이지가 바뀌면 맨 위부터 보이게 + 탭 제목 변경
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = getPageTitle(pathname)
  }, [pathname])

  return (
    <>
      <p className="site-bar">보성 차밭에서 온 건강한 한 잔</p>
      <aside className="side-banner">
        <Link to="/product/DH-007">
          <img src="/images/left-banner-nukki.png" alt="100% 보성산 유기농, 보성 차밭의 초록 그대로 유기농 가루녹차" />
        </Link>
      </aside>
      <div className="app">
        <Header />
        <main>
          <BackBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/fail" element={<PaymentFail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/find-account" element={<FindAccount />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/info/:slug" element={<Info />} />
            <Route path="/story" element={<Story />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consult/:channel" element={<Consult />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
      <FloatingButtons />
    </>
  )
}

export default App

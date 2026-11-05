import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BottomNav from './components/BottomNav.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import PaymentFail from './pages/PaymentFail.jsx'
import './App.css'

function App() {
  const { pathname } = useLocation()

  // 페이지가 바뀌면 맨 위부터 보이게
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <p className="site-bar">HEALTHY JUICE FROM NATURE</p>
      <aside className="side-banner">
        <img src="/images/left-banner-nukki.png" alt="100% 보성산 유기농, 보성 차밭의 초록 그대로 유기농 가루녹차" />
      </aside>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/fail" element={<PaymentFail />} />
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

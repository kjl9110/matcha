import { Link } from 'react-router-dom'
import { IoPersonOutline, IoCartOutline, IoSearch } from 'react-icons/io5'
import './Header.css'

function Header() {
  return (
    <>
      <p className="header__topbar">회원 가입 시 2천원 쿠폰 증정</p>
      {/* 메뉴 줄만 스크롤해도 위에 고정 */}
      <header className="header__bar">
        <h1 className="header__logo">
          <Link to="/">
            <img src="/images/logo-daehandawon.jpg" alt="대한다원 보성녹차밭" />
          </Link>
        </h1>
        <div className="header__actions">
          <button type="button" aria-label="마이페이지"><IoPersonOutline /></button>
          <button type="button" aria-label="장바구니"><IoCartOutline /></button>
          <button type="button" aria-label="검색"><IoSearch /></button>
        </div>
      </header>
    </>
  )
}

export default Header

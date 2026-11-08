import { Link } from 'react-router-dom'
import { IoChevronForward } from 'react-icons/io5'
import data from '../data/daehandawon_products.json'
import { useAuth } from '../context/useAuth.js'
import './Order.css'
import './Pages.css'

const categories = [...new Set(data.products.map((product) => product.category))]

const SHOP_LINKS = [
  { label: '전체상품', to: '/products' },
  { label: '상품 검색', to: '/products?search=1' },
  { label: '찜한 상품', to: '/wishlist' },
  { label: '최근 본 상품', to: '/recent' },
  { label: '이벤트', to: '/events' },
  { label: '상품리뷰', to: '/reviews' },
]

const HELP_LINKS = [
  { label: '브랜드 이야기', to: '/story' },
  { label: '문의하기', to: '/contact' },
  { label: '이용안내', to: '/info/guide' },
  { label: '회사소개', to: '/info/company' },
]

function MenuList({ title, links }) {
  return (
    <>
      <h3 className="page-heading">{title}</h3>
      <ul className="page-menu">
        {links.map(({ label, to }) => (
          <li key={to}>
            <Link to={to}>{label}<IoChevronForward aria-hidden="true" /></Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function Menu() {
  const { user } = useAuth()
  const categoryLinks = categories.map((name) => ({
    label: name,
    to: `/products?category=${encodeURIComponent(name)}`,
  }))

  return (
    <section className="order-page">
      <h2 className="order-page__title">메뉴</h2>
      <Link to={user ? '/mypage' : '/login'} className="order-button">
        {user ? `${user.name}님의 마이페이지` : '로그인'}
      </Link>
      <MenuList title="카테고리" links={categoryLinks} />
      <MenuList title="쇼핑" links={SHOP_LINKS} />
      <MenuList title="고객지원" links={HELP_LINKS} />
    </section>
  )
}

export default Menu

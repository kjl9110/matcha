import data from '../data/daehandawon_products.json'
import { infoPages } from '../data/info_pages.js'

const BRAND = '대한다원 보성녹차밭'

const TITLES = {
  '/cart': '장바구니',
  '/checkout': '주문서',
  '/payment/success': '주문 완료',
  '/payment/fail': '결제 실패',
  '/login': '로그인',
  '/signup': '회원가입',
  '/find-account': '아이디·비밀번호 찾기',
  '/mypage': '마이페이지',
  '/products': '전체상품',
  '/recent': '최근 본 상품',
  '/wishlist': '찜한 상품',
  '/menu': '메뉴',
  '/reviews': '상품리뷰',
  '/events': '이벤트',
  '/story': '브랜드 이야기',
  '/contact': '문의하기',
  '/consult/talk': '톡톡상담',
  '/consult/kakao': '카톡상담',
}

// 브라우저 탭에 보일 페이지 이름 (메인은 브랜드 이름만)
function findName(pathname) {
  if (TITLES[pathname]) return TITLES[pathname]
  const [, section, id] = pathname.split('/')
  if (section === 'product') return data.products.find((product) => product.id === id)?.title
  if (section === 'info') return infoPages[id]?.title
  if (section === 'events') return TITLES['/events']
  return null
}

export function getPageTitle(pathname) {
  const name = findName(pathname)
  return name ? `${name} | ${BRAND}` : BRAND
}

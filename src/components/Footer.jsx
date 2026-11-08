import { Link } from 'react-router-dom'
import {
  IoCardOutline,
  IoShieldCheckmarkOutline,
  IoReceiptOutline,
  IoDocumentTextOutline,
} from 'react-icons/io5'
import './Footer.css'

const links = [
  { label: '홈', to: '/' },
  { label: '브랜드 이야기', to: '/story' },
  { label: '회사소개', to: '/info/company' },
  { label: '이용약관', to: '/info/terms' },
  { label: '개인정보취급방침', to: '/info/privacy' },
  { label: '이용안내', to: '/info/guide' },
]

const certs = [
  { Icon: IoCardOutline, label: '신용카드결제' },
  { Icon: IoShieldCheckmarkOutline, label: '구매안전서비스' },
  { Icon: IoReceiptOutline, label: '현금영수증 가맹점' },
  { Icon: IoDocumentTextOutline, label: '공정위 표준약관' },
]

// 연락처·사업자 정보는 포트폴리오용 샘플 값
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          <div>
            <h2 className="footer__heading">고객센터</h2>
            <p className="footer__phone">000-0000-0000</p>
            <p className="footer__text">
              평일 : AM 10:00 ~ PM 06:00<br />
              점심 : PM 12:00 ~ PM 01:00<br />
              토, 일, 공휴일은 쉽니다.
            </p>
          </div>
          <div>
            <h2 className="footer__heading">입금계좌안내</h2>
            <p className="footer__account">농협 000-00-000000</p>
            <p className="footer__text">예금주 - 대한다원</p>
          </div>
        </div>

        <ul className="footer__links">
          {links.map(({ label, to }) => (
            <li key={label}><Link to={to}>{label}</Link></li>
          ))}
        </ul>

        <p className="footer__text">
          상호명 : 대한다원 / 대표자 : 000 / 고객센터 : 000-0000-0000<br />
          주소 : 전라남도 보성군 (샘플 주소)<br />
          이메일 : sample@example.com / 사업자등록번호 : 000-00-00000<br />
          통신판매업신고번호 : 제0000-전남보성-0000호
        </p>
        <p className="footer__text footer__copyright">
          Copyright © 대한다원. All rights reserved.<br />
          포트폴리오 시안용 샘플 페이지로, 가격·후기·배송·사업자 정보는 실제 정보가 아닙니다.
        </p>
      </div>

      <ul className="footer__certs">
        {certs.map(({ Icon, label }) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </footer>
  )
}

export default Footer

import { Link, useParams } from 'react-router-dom'
import { infoPages } from '../data/info_pages.js'
import NotFound from './NotFound.jsx'
import './Order.css'
import './Pages.css'

function Info() {
  const { slug } = useParams()
  const page = infoPages[slug]

  if (!page) return <NotFound />

  return (
    <section className="order-page">
      <h2 className="order-page__title">{page.title}</h2>
      <p className="page-demo-notice">포트폴리오 시안용 샘플 문구입니다.</p>
      {page.sections.map(({ heading, items }) => (
        <div key={heading}>
          <h3 className="page-heading">{heading}</h3>
          <ul className="page-bullets">
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
      <p className="page-link-row"><Link to="/contact">문의하기</Link></p>
    </section>
  )
}

export default Info

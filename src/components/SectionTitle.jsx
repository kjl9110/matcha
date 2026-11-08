import { Link } from 'react-router-dom'
import { IoAdd } from 'react-icons/io5'
import './SectionTitle.css'

// align: 'center'(제목·부제 가운데) | 'left'(왼쪽 제목 + 오른쪽 더보기)
function SectionTitle({ title, subtitle, align = 'center', moreLabel, moreTo }) {
  return (
    <div className={`section-title section-title--${align}`}>
      <h2 className="section-title__text">{title}</h2>
      {subtitle && <p className="section-title__sub">{subtitle}</p>}
      {moreLabel && (
        <Link to={moreTo} className="section-title__more" aria-label={moreLabel}>
          <IoAdd />
        </Link>
      )}
    </div>
  )
}

export default SectionTitle

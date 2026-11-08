import { useSearchParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts.jsx'

// 검색 아이콘·카테고리 아이콘이 쓰는 상품 목록 (주소의 값이 바뀌면 새로 그림)
function Products() {
  const [params] = useSearchParams()
  const category = params.get('category') ?? '전체'
  const query = params.get('q') ?? ''
  const focus = params.has('search')

  return (
    <AllProducts
      key={params.toString()}
      initialCategory={category}
      initialQuery={query}
      autoFocus={focus}
    />
  )
}

export default Products

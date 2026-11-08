import { useEffect, useState } from 'react'
import { readList, writeList } from '../utils/localStore.js'
import { WishlistContext } from './wishlistContext.js'

const STORAGE_KEY = 'matcha-wishlist'

// 찜 목록은 이 브라우저에만 저장 (새로고침해도 유지)
export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => readList(STORAGE_KEY))

  useEffect(() => {
    writeList(STORAGE_KEY, ids)
  }, [ids])

  const isWished = (id) => ids.includes(id)

  const toggleWish = (id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]))
  }

  return (
    <WishlistContext.Provider value={{ ids, isWished, toggleWish }}>
      {children}
    </WishlistContext.Provider>
  )
}

import { useEffect, useState } from 'react'
import { MAX_QUANTITY } from '../utils/order.js'
import { CartContext } from './cartContext.js'

const STORAGE_KEY = 'matcha-cart'

// 장바구니는 이 브라우저에만 저장 (새로고침해도 유지)
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const clamp = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, quantity))

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // 저장이 막힌 환경(시크릿 모드 등)에서는 화면 상태만 유지
    }
  }, [items])

  const addItem = (id, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((item) => item.id === id)
      if (found) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: clamp(item.quantity + quantity) } : item,
        )
      }
      return [...prev, { id, quantity: clamp(quantity) }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: clamp(quantity) } : item)),
    )
  }

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id))
  const clearCart = () => setItems([])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

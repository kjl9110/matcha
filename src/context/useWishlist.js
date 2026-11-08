import { useContext } from 'react'
import { WishlistContext } from './wishlistContext.js'

export const useWishlist = () => useContext(WishlistContext)

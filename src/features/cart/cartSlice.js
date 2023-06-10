import { createSlice } from '@reduxjs/toolkit'
import orderItems from '../../orderItems'
const initialState = {
  cartItems: orderItems,
  quantity: 4,
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem : (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId
      })
    }
  },
})

// console.log(cartSlice)
export const { clearCart , removeItem } = cartSlice.actions

export default cartSlice.reducer

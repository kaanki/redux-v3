import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import OrderItem from './OrderItem'
import { openModal } from '../features/modal/modalSlice'

const OrderList = () => {
  const dispatch = useDispatch()
  const { cartItems, total, quantity } = useSelector((store) => store.cart)
  if (quantity < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>Sepetiniz</h2>
          <h4>Boş</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      <header>
        <h2>Sepetiniz</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <OrderItem key={item.id} {...item} />
        })}
      </div>
      <footer>
        <hr />
        <div>
          toplam tutar: <span>${total}</span>
        </div>
        <button className='cart-clear' onClick={() => dispatch(openModal())}>
          Sepeti Temizle
        </button>
      </footer>
    </section>
  )
}
export default OrderList

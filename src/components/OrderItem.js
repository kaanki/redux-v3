import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { removeItem } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'


const OrderItem = ({ id, title, price, img, quantity }) => {
  const dispatch = useDispatch();
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div className='cart-info'>
        <h4>{title}</h4>
        <h4>{price}TL</h4>
        <div>
          <button className='cart-button'>
            <BsChevronUp />
          </button>
          <p className='cart-quantity'>{quantity}</p>
          <button className='cart-button'>
            <BsChevronDown />
          </button>
        </div>
        <button className='cart-delete' onClick={() => dispatch(removeItem(id))}>Sil</button>
      </div>
    </article>
  )
}
export default OrderItem

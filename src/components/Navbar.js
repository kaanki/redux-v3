import { useSelector } from 'react-redux'
import { BsBasketFill } from 'react-icons/bs'

const Navbar = () => {
  const { quantity } = useSelector((store) => store.cart)
  return (
    <div className='nav-container'>
      <h3>Siparişlerim</h3>
      <div className='nav-items'>
        <p>{quantity}</p>
        <BsBasketFill className='nav-icon' />
      </div>
    </div>
  )
}
export default Navbar

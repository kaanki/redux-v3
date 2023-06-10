import Navbar from "./components/Navbar";
import OrderList from "./components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems("rastgele"))
  }, []);
  if (isLoading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    )
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <OrderList />
    </main>
  );
}
export default App;

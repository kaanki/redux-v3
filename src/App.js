import Navbar from "./components/Navbar";
import OrderList from "./components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { calculateTotals } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <main>
      {isOpen && <Modal/>}
      <Navbar />
      <OrderList />
    </main>
  );
}
export default App;

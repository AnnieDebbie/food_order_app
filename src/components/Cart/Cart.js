import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes["button--alt"]}>
          Close
        </button>
      { hasItems &&
        <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

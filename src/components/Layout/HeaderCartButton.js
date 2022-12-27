import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items);
  
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        {" "}
        <CartIcon />{" "}
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import MealOrderForm from "./components/Order/MealOrderForm";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showFormHandler = () => {
    setFormIsShown(true);
    setCartIsShown(false);
  };
  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onCloseCart={hideCartHandler} onShowForm={showFormHandler} />
      )}
      {formIsShown && <MealOrderForm onCloseForm={hideFormHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

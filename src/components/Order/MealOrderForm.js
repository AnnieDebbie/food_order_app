import React, { useContext } from "react";
import useInput from "../../hooks/custom-input";
import CartContext from "../../store/cart-context";
import Input from "../UI/Input";
import classes from "./MealOrderForm.module.css";
import Modal from "../UI/Modal";
import CloseIcon from "../Cart/CloseIcon";

const MealOrderForm = (props) => {
  const { items } = useContext(CartContext);
  const cartCtx = useContext(CartContext);

  const notEmpty = (value) => value.trim() !== "";
  const validateEmail = (value) =>
    value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  const validatePhone = (value) => value.trim().length === 11;

  const {
    value: enteredFirstName,
    isValid: firstNameValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(notEmpty);

  const {
    value: enteredLastName,
    isValid: lastNameValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(notEmpty);

  const {
    value: enteredEmail,
    isValid: emailValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    value: enteredPhone,
    isValid: phoneValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(validatePhone);

  const inputProps = [
    {
      id: "firstName",
      type: "text",
      min: "8",
      max: "12",
      label: "First name",
      value: enteredFirstName,
      onChange: firstNameChangeHandler,
      onBlur: firstNameBlurHandler,
      hasError: firstNameHasError,
    },

    {
      id: "lastName",
      type: "text",
      min: "8",
      max: "12",
      label: "Last name",
      value: enteredLastName,
      onChange: lastNameChangeHandler,
      onBlur: lastNameBlurHandler,
      hasError: lastNameHasError,
    },

    {
      id: "phone",
      type: "phone",
      min: "11",
      max: "11",
      label: "Phone number",
      value: enteredPhone,
      onChange: phoneChangeHandler,
      onBlur: phoneBlurHandler,
      hasError: phoneHasError,
    },

    {
      id: "email",
      type: "email",
      label: "Email",
      value: enteredEmail,
      onChange: emailChangeHandler,
      onBlur: emailBlurHandler,
      hasError: emailHasError,
    },
  ];

  /*
  const formIsValid = 
    firstNameValid && lastNameValid && emailValid && phoneValid;
    */
  let formIsValid = false;
  if (firstNameValid && lastNameValid && emailValid && phoneValid)
    formIsValid = true;

  const disabledBtn =
    !firstNameValid || !lastNameValid || !emailValid || !phoneValid;

  const orderData = Object.assign(
    {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      emailAddress: enteredEmail,
      phoneNumber: enteredPhone,
    },
    ...items
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    fetch(
      "https://food-order-app-4dc6a-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPhone();

    cartCtx.clearCart();
    props.onCloseForm();
  };
  return (
    <Modal onCloseCart={props.onCloseForm}>
      <div className={classes["meal-order__heading"]}>
        <h3 className={classes["meal-order__header"]}>Meal Order Form</h3>
        <button
          className={classes["meal-order__btn"]}
          onClick={props.onCloseForm}
        >
          <CloseIcon />
        </button>
      </div>

      <form
        className={classes["meal-order__form"]}
        onSubmit={submitHandler}
        action=""
      >
        {inputProps.map((prop) => (
          <>
            <Input
              className={classes["meal-order__input"]}
              key={prop.id}
              input={{
                id: prop.id,
                type: prop.type,
                min: prop.min,
                max: prop.max,
              }}
              label={prop.label}
              onChange={prop.onChange}
              onBlur={prop.onBlur}
            />

            {prop.hasError === true && (
              <p className={classes["error-message"]}>
                {prop.label} is invalid. Please type in a valid input
              </p>
            )}
          </>
        ))}

        <table className={classes.table}>
          <thead>
            <tr>
              <th> Items</th>
              <th> Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((detail, idx) => (
              <tr>
                <td>{detail.name}</td>
                <td>{detail.amount}</td>
                <td>{detail.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button disabled={disabledBtn} className={classes["meal-order__btn"]}>
          {" "}
          Order{" "}
        </button>
      </form>
    </Modal>
  );
};

export default MealOrderForm;

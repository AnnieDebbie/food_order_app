import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        className={props.inputClass}
        onBlur={props.onBlur}
        onChange={props.onChange}
        ref={ref}
      />
    </div>
  );
});

export default Input;

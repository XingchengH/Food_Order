import React from "react";
import styles from "./Input.module.css";

const input = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      {/*  htmlFor is a React thing, not HTML*/}
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* {...props.input} is a spread operator ensure all the key value pair are added as props to input*/}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default input;

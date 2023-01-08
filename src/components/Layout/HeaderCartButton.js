import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext); //get the context
  const { items } = cartCtx; //get the items from the context

  //get the number of items in the cart
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0); //reduce the array to a single number

  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`; //add the bump class if the button is highlighted

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); //300ms

    return () => {
      clearTimeout(timer);
    }; //cleanup function
  }, [items]);

  return (
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

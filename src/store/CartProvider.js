import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCarItemIdx = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCarItemIdx];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCarItemIdx] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCarItemIdx = state.items.findIndex((item) => {
      return item.id === action.id;
    }); //find the index of the item with the id
    const existingItem = state.items[existingCarItemIdx]; //get the item with the id
    const updatedTotalAmount = state.totalAmount - existingItem.price; //subtract the price of the item from the total amount
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id); //filter out the item with the id
    } else {
      //if the amount of the item is greater than 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; //decrement the amount of the item
      updatedItems = [...state.items]; //copy the items array
      updatedItems[existingCarItemIdx] = updatedItem; //replace the item with the updated item
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const handleAddItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const handleRemoveItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

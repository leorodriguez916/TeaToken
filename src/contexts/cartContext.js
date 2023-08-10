import React, { useReducer, createContext } from "react";
import { cartReducer, cartState } from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  //useReducer returns an array.
  const [cart, dispatch] = useReducer(cartReducer, cartState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

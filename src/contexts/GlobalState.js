import React, { useState, useReducer } from "react";
import { cartReducer, cartState } from "../reducers/cartReducer";
import ProductContextProvider, { ProductContext } from "./productContext";
import CartContextProvider, { CartContext } from "./cartContext";
import {
  productReducer,
  productState,
  gotProducts,
} from "../reducers/productReducer";
import axios from "axios";

//Has properties id, title, description, price, img, qty.
//FOR LOOKING ONLY. this is in other file cartReducer
// export const cartState = {
//   cart: [],
// };

// export const productState = {
//   singleProduct: {},
//   allProducts: [],
// };

const GlobalState = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, cartState);
  const [product, dispatchProduct] = useReducer(productReducer, productState);

  function getProducts() {
    return async function (dispatch) {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/products`);
        console.log(data);
        console.log(dispatch);
        dispatch(gotProducts(data));
      } catch (err) {
        console.error(err);
      }
    };
  }

  return (
    <ProductContext.Provider
      value={{
        singleProduct: product.singleProduct,
        allProducts: product.allProducts,
        getProducts: getProducts,
        dispatch: dispatchProduct,
      }}
    >
      <CartContext.Provider value={{ cart: cart.cart, dispatch: dispatchCart }}>
        {props.children}
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default GlobalState;

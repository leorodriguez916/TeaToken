import React, { useEffect, useState, useReducer } from "react";
import { cartReducer, cartState } from "../reducers/cartReducer";
import ProductContextProvider, { ProductContext } from "./productContext";
import CartContextProvider, { CartContext } from "./cartContext";
import { AuthProvider } from "./authContext";
import {
  productReducer,
  productState,
  gotProducts,
  GOT_PRODUCTS,
} from "../reducers/productReducer";
import axios from "axios";

const GlobalState = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, cartState);
  const [product, dispatchProduct] = useReducer(productReducer, productState);

  function getProducts() {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/products`);
        dispatchProduct({ type: GOT_PRODUCTS, products: data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }

  return (
    <AuthProvider>
      <ProductContext.Provider
        value={{
          products: product,
          singleProduct: product.singleProduct,
          allProducts: product.allProducts,
          getProducts: getProducts,
          dispatch: dispatchProduct,
        }}
      >
        <CartContext.Provider
          value={{
            cart: cart.cart,
            dispatch: dispatchCart,
          }}
        >
          {props.children}
        </CartContext.Provider>
      </ProductContext.Provider>
    </AuthProvider>
  );
};

export default GlobalState;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/products`);
//       dispatchProduct({ type: GOT_PRODUCTS, products: data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   fetchData();
// }, []);

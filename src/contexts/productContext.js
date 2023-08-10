import React, { createContext, useReducer } from "react";
import { productReducer, productState } from "../reducers/productReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, dispatch] = useReducer(productReducer, productState);

  console.log(dispatch);
  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

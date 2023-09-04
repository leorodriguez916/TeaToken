import React, { createContext, useReducer, useEffect } from "react";
import { productReducer, productState } from "../reducers/productReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [products, dispatch] = useReducer(productReducer, productState);

  const getProducts = () => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/products`);
        dispatch({ type: GOT_PRODUCTS, products: data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };

  return (
    <ProductContext.Provider value={{ products, getProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;

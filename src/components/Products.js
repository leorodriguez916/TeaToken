import React, { useEffect, useContext, useReducer } from "react";
import MyGrid from "./UI/MyGrid";

import ListProduct from "./ListProduct";
import { Center } from "@chakra-ui/react";
import { CartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";
import { DELETE_PRODUCT } from "../reducers/productReducer";
import axios from "axios";

export default function Products() {
  const { products, dispatch, getProducts } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (product) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/products/${product.id}`
      );
      dispatch({ type: DELETE_PRODUCT, product: product });
    } catch (err) {
      console.log(err);
    }
  };

  return products ? (
    <MyGrid minW="375px" m="30px" p="30px" gap="1.5rem" justifyContent="center">
      {products.allProducts[0]
        ? products.allProducts.map((product) => (
            <Center key={product.id}>
              <ListProduct
                key={product.id}
                product={product}
                products={products}
                dispatch={dispatch}
                deleteProduct={deleteProduct}
              />
            </Center>
          ))
        : null}
    </MyGrid>
  ) : null;
}

// {this.props.products
//   .filter((product) => {
//     if (!this.state.search.trim()) return true;
//     return product.name.toLowerCase();
//   })
//   .map((product) => {
//     return <ProductItem key={product.id} product={product} />;
//   })}

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3001/api/products`);
//       dispatch({ type: GOT_PRODUCTS, products: data });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   fetchData();
// }, []);

// const [products, dispatch] = useReducer(productReducer, {});

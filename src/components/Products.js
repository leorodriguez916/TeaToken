import React, { useEffect, useContext, useReducer, useState } from "react";
import MyGrid from "./UI/MyGrid";
import { inputStyle, buttonStyle } from "../Styles";
import ListProduct from "./ListProduct";
import {
  GridItem,
  Heading,
  HStack,
  Input,
  Box,
  Link,
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import { CartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";
import {
  productReducer,
  productState,
  GOT_PRODUCTS,
} from "../reducers/productReducer";
import axios from "axios";

export default function Products() {
  const [products, dispatch] = useReducer(productReducer, productState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/products`);
        dispatch({ type: GOT_PRODUCTS, products: data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(products);

  return (
    <MyGrid minW="375px" m="30px" p="30px" gap="1.5rem" justifyContent="center">
      {products.allProducts[0]
        ? products.allProducts.map((product) => (
            <Center key={product.id}>
              <ListProduct key={product.id} product={product} />
            </Center>
          ))
        : null}
    </MyGrid>
  );
}

// {this.props.products
//   .filter((product) => {
//     if (!this.state.search.trim()) return true;
//     return product.name.toLowerCase();
//   })
//   .map((product) => {
//     return <ProductItem key={product.id} product={product} />;
//   })}

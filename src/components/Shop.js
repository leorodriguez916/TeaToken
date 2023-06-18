import React from "react";
import MyGrid from "./UI/MyGrid";
import { inputStyle, buttonStyle } from "../Styles";
import ProductItem from "./ProductItem";
import {
  GridItem,
  Heading,
  HStack,
  Input,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";

let isAdmin = true;

export default function Shop() {
  return <MyGrid></MyGrid>;
}

// {this.props.products
//   .filter((product) => {
//     if (!this.state.search.trim()) return true;
//     return product.name.toLowerCase();
//   })
//   .map((product) => {
//     return <ProductItem key={product.id} product={product} />;
//   })}

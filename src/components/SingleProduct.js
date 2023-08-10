import React from "react";
import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Button,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { GOT_PRODUCT, productState } from "../reducers/productReducer";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productReducer } from "../reducers/productReducer";
import { buttonStyle } from "../Styles";
import axios from "axios";

export default function SingleProduct(auth = { id: 1, role: "none" }) {
  const [products, dispatch] = useReducer(productReducer, productState);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/products/${id}`
        );
        dispatch({ type: GOT_PRODUCT, product: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const product = products.singleProduct;

  console.log(product);

  const url = `public/${product.imageSrc}`;

  return product.id ? (
    <VStack>
      <Image boxSize="100px" src={product.imageSrc} alt="tea image"></Image>
      <Text color="tea.green">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </Text>
      <HStack spacing="10px">
        {" "}
        <Text color="tea.matcha">{product.price}</Text> <Spacer />
        <Button {...buttonStyle()}>Add</Button>
        {auth.id && auth.role === "admin" && (
          <Button
            onClick={() => deleteProduct(product.id)}
            m="10px"
            colorScheme="red"
            borderRadius="full"
            size="xs"
          >
            x{" "}
          </Button>
        )}
      </HStack>
    </VStack>
  ) : (
    "null"
  );
}

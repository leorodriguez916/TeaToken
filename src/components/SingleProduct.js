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
  Center,
  Heading,
  Select,
} from "@chakra-ui/react";
import { GOT_PRODUCT, productState } from "../reducers/productReducer";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productReducer } from "../reducers/productReducer";
import { buttonStyle } from "../Styles";
import axios from "axios";

export default function SingleProduct({ auth = { id: 1, role: "admin" } }) {
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

  const url = `../${product.imageSrc}`;

  return product.id ? (
    <Center>
      <HStack>
        <VStack pl="30px" m="20px">
          <Image minW="200px" boxSize="200px" src={url} alt="tea image"></Image>

          <HStack spacing="10px">
            {" "}
            <Text color="tea.green">Price:</Text> <Spacer />
            <Text color="tea.matcha">{product.price}</Text> <Spacer />
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
        <Spacer />
        <VStack align="left" pr="30px" m="20px">
          <Heading size="lg" color="tea.brown">
            {product.name}
          </Heading>
          <Text>{product.description}</Text>
          <HStack>
            <Select mt="10px" mr="10px" maxW="100px" placeholder="Qty">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Select>
            <Button mt="10px" maxW="100px" {...buttonStyle()}>
              Add to Cart
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Center>
  ) : (
    "null"
  );
}

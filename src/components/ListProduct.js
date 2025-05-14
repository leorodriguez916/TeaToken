import React from "react";
import { Link } from "react-router-dom";
import { VStack, Image, Text, HStack, Button } from "@chakra-ui/react";
import { buttonStyle, adminStyle } from "../Styles";
import { useAuth } from "../contexts/authContext";

export default function ListProduct({
  product,
  deleteProduct = {},
  auth = { id: 1, role: "admin" },
  view = false,
}) {
  const { me } = useAuth();

  return product ? (
    <VStack
      maxW="350px"
      minW="325px"
      p="30px"
      backgroundColor="white"
      borderRadius="20px"
    >
      <Image boxSize="100px" src={product.imageSrc} alt="tea image"></Image>
      <Text color="tea.green">
        <Link to={`/products/${product.id}`}>{product.name}</Link>{" "}
      </Text>
      <Text color="tea.dark">Location: {product.location.name}</Text>
      <Text color="tea.dark">Caffeine: {product.caffeine}mg per cup</Text>

      <HStack spacing="10px">
        {" "}
        <Text color="tea.matcha" mr="5px">
          {product.price}
        </Text>
        <Button onClick={() => addProduct(product)} {...buttonStyle()}>Add</Button>
        {me && me.role === "admin" ? (
          <Button
            onClick={() => deleteProduct(product)}
            m="10px"
            {...adminStyle()}
          >
            x{" "}
          </Button>
        ) : null}
      </HStack>
    </VStack>
  ) : null;
}

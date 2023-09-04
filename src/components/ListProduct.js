import React from "react";
import { Link } from "react-router-dom";
import { VStack, Image, Text, HStack, Button } from "@chakra-ui/react";
import { buttonStyle, adminStyle } from "../Styles";

export default function ListProduct({
  product,
  deleteProduct = {},
  auth = { id: 1, role: "admin" },
  view = false,
}) {
  return product ? (
    <VStack
      maxW="350px"
      minW="325px"
      m="10px"
      p="30px"
      backgroundColor="white"
      borderRadius="20px"
    >
      <Image boxSize="100px" src={product.imageSrc} alt="tea image"></Image>
      <Text color="tea.green">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </Text>
      <HStack spacing="10px">
        {" "}
        <Text color="tea.matcha" mr="5px">
          {product.price}
        </Text>
        <Button {...buttonStyle()}>Add</Button>
        {auth.id && auth.role === "admin" && (
          <Button
            onClick={() => deleteProduct(product)}
            m="10px"
            {...adminStyle()}
          >
            x{" "}
          </Button>
        )}
      </HStack>
    </VStack>
  ) : null;
}

import React from "react";
import { Link } from "react-router-dom";
import {
  GridItem as Gi,
  VStack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
// import { connect } from "react-redux";
// import { deleteProduct } from "../store/product";
// import ProductToCartBtn from "./ProductToCartBtn";

export default function ProductItem({
  product,
  auth,
  deleteProduct,
  view = false,
}) {
  return (
    <Gi>
      <VStack
        spacing="10px"
        align="start"
        as={Link}
        to={`/products/${product.id}`}
      >
        <Image src={product.imageUrl} alt="tea image" />
        <Heading color="tea.matcha">{product.name}</Heading>

        {!view && <Text fontSize="lg">${product.price}</Text>}
      </VStack>

      {!view && (
        <HStack>
          <Button marginTop="2" product={product} btnStyle="outline" />
          <Spacer />
          {auth.id && auth.role === "admin" && (
            <Button colorScheme="red" borderRadius="full" size="xs">
              X
            </Button>
          )}
        </HStack>
      )}
    </Gi>
  );
}

//onClick={() => deleteProduct(product.id)}

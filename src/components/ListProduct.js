import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem as Gi,
  VStack,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { ProductContext } from "../contexts/productContext";
import { deleteProduct } from "../reducers/productReducer";
// import ProductToCartBtn from "./ProductToCartBtn";
import { buttonStyle } from "../Styles";

export default function ListProduct({
  product,
  auth = { id: 1, role: "none" },
  deleteProduct,
  view = false,
}) {
  const { dispatch } = useContext(ProductContext);

  return (
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
  );

  // return (
  //   <Gi>
  //     <VStack
  //       spacing="2px"
  //       align="start"
  //       as={Link}
  //       to={`/products/${product.id}`}
  //     >
  //       <Image boxSize="150px" src={product.imageSrc} alt="tea image" />
  //       <Heading color="tea.matcha">{product.name}</Heading>

  //       {!view && <Text fontSize="lg">${product.price}</Text>}
  //     </VStack>

  //     {!view && (
  //       <HStack>
  //         <Button marginTop="2" product={product} btnStyle="outline" />
  //         <Spacer />
  //         {auth.id && auth.role === "admin" && (
  //           <Button colorScheme="red" borderRadius="full" size="xs">
  //             X
  //           </Button>
  //         )}
  //       </HStack>
  //     )}
  //   </Gi>
  // );
}

//onClick={() => deleteProduct(product.id)}

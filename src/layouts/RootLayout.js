import React from "react";
import MyGrid from "../components/UI/MyGrid";
import { inputStyle, buttonStyle } from "../Styles";
import {
  AiOutlineShoppingCart,
  AiOutlineSmile,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  Text,
  Link,
  Icon,
  IconButton,
  Spacer,
  Box,
  Container,
  HStack,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  const navStyles = {
    mt: "0px",
    mb: "30px",
    ml: "40px",
    mr: "40px",
    color: "tea.brown",
    p: "10px",
    fontWeight: "bold",
  };

  const handleSearch = () => {
    console.log("Search complete.");
    return;
  };

  let isAdmin = true;

  return (
    <div>
      <Box sx={navStyles}>
        <Container>
          <HStack fontSize="1.4rem" pt={12} spacing="3rem">
            <Text>
              <NavLink to="/">TeaTokens</NavLink>
            </Text>
            <Spacer />
            <NavLink to="/checkout">
              <Icon as={AiOutlineShoppingCart} w="7" h="7" />
            </NavLink>
            <NavLink to="/account">
              <Icon as={AiOutlineSmile} w="7" h="7" />
            </NavLink>
          </HStack>
        </Container>
      </Box>

      <MyGrid mb="3rem" ml="50px" mr="50px">
        <GridItem gridColumn="1 / -1" as={HStack} spacing="2rem">
          <Heading color="tea.green" textTransform="lowercase">
            Enjoy
          </Heading>
          <Input
            name="search"
            type="text"
            placeholder="Your tea"
            {...inputStyle}
          />
          <IconButton
            aria-label="Search tea collection"
            icon={<AiOutlineSearch />}
            variant="outline"
            colorScheme="green"
            w="10"
            h="10"
            onClick={handleSearch}
          />
          {isAdmin && (
            <Box as="button" {...buttonStyle()}>
              <Link to="/products/create">
                <Text>Create Product</Text>
              </Link>
            </Box>
          )}
        </GridItem>
      </MyGrid>

      <main>
        <Outlet />
        <Text p="10px" align="center">
          Hello
        </Text>
      </main>
    </div>
  );
}

import React, { useEffect, useState, useReducer } from "react";
import MyGrid from "../components/UI/MyGrid";
import { inputStyle, buttonStyle, adminStyle } from "../Styles";
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
  Button,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function RootLayout() {
  const navStyles = {
    ml: "40px",
    mr: "40px",
    color: "tea.matcha",
    p: "10px",
    fontWeight: "bold",
  };

  const handleSearch = () => {
    console.log("Search complete.");
    return;
  };

  let isAdmin = true;

  const { user, loading } = useAuth();

  console.log(user);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("token"); // or actual user data
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  if (loading) return null;

  return (
    <div>
      <MyGrid
        mb="3rem"
        p="20px"
        borderBottom="1px dashed"
        borderColor="tea.green"
        bgColor="tea.green"
      >
        <GridItem gridColumn="1 / -1" as={HStack} spacing="2rem" sx={navStyles}>
          <Heading textTransform={"lowercase"}>
            <NavLink to="/">TeaTokens</NavLink>
          </Heading>
          <Spacer />
          <NavLink to="/checkout">
            <Icon as={AiOutlineShoppingCart} w="7" h="7" />
          </NavLink>
          {!user ? (
            <NavLink to="/login">
              <Button
                minW="100px"
                maxW="200px"
                w="100%"
                {...buttonStyle()}
                color="tea.brown"
                bgColor="tea.light.50"
              >
                Log In
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/account">
              <Icon as={AiOutlineSmile} w="7" h="7" />
            </NavLink>
          )}
          {user ? (
            <NavLink to="/account">
              <Button
                minW="100px"
                maxW="200px"
                w="100%"
                {...buttonStyle()}
                color="tea.brown"
                bgColor="tea.light.50"
              >
                Welcome, {user.username}
              </Button>
            </NavLink>
          ) : null}
        </GridItem>
      </MyGrid>

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
            <NavLink to="/products/create">
              <Button w="100%" maxW="200px" minW="150px" {...adminStyle()}>
                Create Product
              </Button>
            </NavLink>
          )}
        </GridItem>
      </MyGrid>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

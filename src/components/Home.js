import React from "react";
import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { buttonStyle } from "../Styles";

export default function Home() {
  return (
    <div>
      <Flex justify="center">
        <Image
          maxH="500px"
          minH="300px"
          pb="40px"
          src="https://st2.depositphotos.com/1177973/12183/i/950/depositphotos_121838152-stock-photo-fresh-matcha-tea-on-background.jpg"
          alt="Fresh matcha leaves."
        />
      </Flex>
      <NavLink to="products">
        <Button w="100%" {...buttonStyle()}>
          Shop Now!{" "}
        </Button>
      </NavLink>
    </div>
  );
}

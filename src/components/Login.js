import React from "react";
import { Text, Center, VStack, Input, Box, Button } from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../Styles";
import { NavLink } from "react-router-dom";

export default function Login() {
  const handleSubmit = () => {};

  return (
    <Center>
      <VStack>
        <NavLink to="/signup">
          <Button
            minW="100px"
            maxW="500px"
            w="100%"
            {...buttonStyle()}
            color="tea.brown"
            bgColor="tea.light.50"
            cursor="pointer"
          >
            Don't have an account yet? Click here to sign up!
          </Button>
        </NavLink>
        <NavLink to="/signup">
          <Text pb="10px" color="tea.green" cursor="pointer"></Text>
        </NavLink>
        <VStack
          as="form"
          onSubmit={handleSubmit}
          name={name}
          w="40%"
          spacing="6"
          marginBottom={4}
        >
          <Input
            name="username"
            type="text"
            placeholder="Username"
            {...inputStyle}
          />

          {name === "signup" && (
            <Input
              name="email"
              type="email"
              placeholder="Email"
              {...inputStyle}
            />
          )}

          <Input
            name="password"
            type="password"
            placeholder="Password"
            {...inputStyle}
          />

          {name === "signup" && (
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...inputStyle}
            />
          )}

          <Box
            as="button"
            type="submit"
            {...buttonStyle()}
            transform="translateY(3.5px)"
          >
            {""}
          </Box>
        </VStack>
      </VStack>
    </Center>
  );
}

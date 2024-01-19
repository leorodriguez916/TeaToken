import React from "react";
import { Text, Center, VStack, Input, Box } from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../Styles";

export default function Login() {
  const handleSubmit = () => {};

  return (
    <Center>
      <VStack>
        <Text pb="10px" color="tea.green" cursor="pointer">
          Don't have an account yet? Click here to sign up!
        </Text>
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

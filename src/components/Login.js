import React, { useEffect, useState, useReducer } from "react";
import { Text, Center, VStack, Input, Box, Button } from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../Styles";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //we dont use this bc it createes a new state instead of using the global context
  //const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/account");
    }
  }, []);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("token"); // or actual user data
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post("http://localhost:3001/api/login", {
        username: values.username,
        password: values.password,
      });
      console.log("Login success:", data);
      // Optional: save token
      localStorage.setItem("token", data.token);
      setUser(data.user);
      console.log("Here's the user");
      // Redirect or set user in context/state
      navigate("/account");
      reset();
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(
        "Login failed: " + (err.response?.data?.error || "Unexpected error")
      );
    }
  };

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
          onSubmit={handleSubmit(onSubmit)}
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
            {...register("username", {
              required: "This field is required.",
            })}
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
            {...register("password", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
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
            {" "}
            Submit
            {""}
          </Box>
        </VStack>
      </VStack>
    </Center>
  );
}

import React, { useEffect, useState, useReducer } from "react";
import { Text, Center, VStack, Input, Box, Button } from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../Styles";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { userState, loginUser, userReducer } from "../reducers/userReducer";
import axios from "axios";

export default function Login() {
  const { setMe } = useAuth();
  const [users, dispatch] = useReducer(userReducer, userState);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //Learning note: We dont use this bc it createes a new state instead of using the global context
  //const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/account");
    }
  }, []);

  const onSubmit = async (values) => {
    console.log("Submitting login form with values:", values);

    const result = await loginUser(values, dispatch);
    if (result.success) {
      localStorage.setItem("token", result.token);
      setMe(result.user);
      alert(result.message);
      navigate("/account");
    } else {
      console.log(result);
      alert(result.message.error);
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
            autoComplete="on"
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

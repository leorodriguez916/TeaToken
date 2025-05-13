import React from "react";
import {
  Text,
  Center,
  VStack,
  Input,
  Box,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { inputStyle, buttonStyle } from "../Styles";
import {
  GOT_USER,
  CREATE_USER,
  createUser,
  userState,
} from "../reducers/userReducer";
import { UserContext } from "../contexts/userContext";
//import User from "../../server/db/models/User";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUp() {
  const [users, dispatch] = useReducer(userReducer, userState);
  const { id } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const isAdmin = true;

  const onSubmit = async (values) => {
    console.log("Submitting form with values:", values);
    if (values.password !== values.passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const result = await createUser(values, dispatch);
    if (!result.success) {
      alert(result.message);
    } else {
      alert(result.message);
      reset();
    }

    // try {
    //   console.log("Sending request to backend...");
    //   const { data } = await axios.post(`http://localhost:3001/api/signup`, {
    //     name: values.username,
    //     password: values.password,
    //     passwordConfirm: values.passwordConfirm,
    //     token: null,
    //     email: values.email,
    //     role: "customer",
    //   });

    //   console.log("Received response:", data);
    //   dispatch({ type: CREATE_USER, user: data });

    //   alert("User created!");
    //   reset();
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   alert("Failed to create user.");
    // }
  };

  //from form control and vstack, removed:
  //name={name}

  return (
    <Center>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="40%"
        spacing="6"
        marginBottom={4}
      >
        <FormControl isInvalid={errors.name}>
          <Input
            mb="10px"
            id="username"
            placeholder="Username"
            {...inputStyle}
            {...register("username", {
              required: "This field is required.",
            })}
          />
          <Input
            type="email"
            mb="10px"
            id="email"
            placeholder="Email"
            {...inputStyle}
            {...register("email", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
          />
          <Input
            type="password"
            mb="10px"
            id="password"
            placeholder="Password"
            {...inputStyle}
            {...register("password", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
          />
          <Input
            type="password"
            mb="10px"
            id="passwordConfirm"
            placeholder="Confirm Password"
            {...inputStyle}
            {...register("passwordConfirm", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
          />

          <FormErrorMessage isInvalid={true}>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          {...buttonStyle()}
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
}

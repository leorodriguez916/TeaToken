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
import { GOT_USER, CREATE_USER, userState } from "../reducers/userReducer";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userReducer } from "../reducers/userReducer";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    console.log("Hello");
    console.log(values);
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  // const handleSubmit = () => {
  //   const postData = async () => {
  //     try {
  //       const { data } = await axios.post(`http://localhost:3001/signup`, {
  //         username: name,
  //         password: password,
  //         passwordConfirm: passwordConfirm,
  //         token: null,
  //         email: email,
  //         role: customer,
  //       });
  //       dispatch({ type: CREATE_USER, user });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     postData();
  //   };
  // };

  const [users, dispatch] = useReducer(userReducer, userState);
  const { id } = useParams();
  const isAdmin = true;

  return (
    <Center>
      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        name={name}
        w="40%"
        spacing="6"
        marginBottom={4}
      >
        <FormControl isInvalid={errors.name} name={name}>
          <Input
            mb="10px"
            id="username"
            placeholder="Username"
            {...inputStyle}
            {...register("username", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
          />
          <Input
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
            mb="10px"
            id="passwordConfirm"
            placeholder="Confirm Password"
            {...inputStyle}
            {...register("passwordConfirm", {
              required: "This field is required.",
              minLength: { value: 4, message: "Minimum length should be 4." },
            })}
          />

          <FormErrorMessage>
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
        {/* <VStack
        as="form"
        onSubmit={handleSubmit}
        name={name}
        w="40%"
        spacing="6"
        marginBottom={4}
      >
        <Text pb="10px" color="tea.green">
          Enter a username and password to get started.
        </Text>

        <Input name="email" type="email" placeholder="Email" {...inputStyle} />
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
        <Input
          name="passwordconfirm"
          type="password"
          placeholder="Confirm Password"
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
          onSubmit={handleSubmit()}
        >
          {"Submit"}
        </Box>
      </VStack> */}
      </VStack>
    </Center>
  );
}

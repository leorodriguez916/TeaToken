import React, { useContext, useEffect, useReducer } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import {
  Box,
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
import {
  DELETE_USER,
  deleteUser,
  userReducer,
  userState,
} from "../../reducers/userReducer";
// import userToCartBtn from "./userToCartBtn";
import { adminStyle } from "../../Styles";

export default function ListUser({
  user,
  auth = { id: 1, role: "admin" },
  deleteUser,
  view = false,
}) {
  if (user.imageSrc === "user.jpeg") user.imageSrc = "../user.jpeg";

  const [userData, dispatch] = useReducer(userReducer, userState);

  function deleteUser(id) {
    return async function (dispatch) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        console.log("deleting!");
        dispatch({ type: DELETE_USER, id: id });
      } catch (err) {
        console.error(err);
      }
    };
  }

  const { me, loading } = useAuth();
  let isAdmin = me ? me.role === "admin" : false;

  return isAdmin ? (
    <VStack
      wrap="wrap"
      maxW="350px"
      minW="325px"
      m="10px"
      p="30px"
      backgroundColor="white"
      borderRadius="20px"
    >
      <Image
        borderRadius="20px"
        boxSize="100px"
        src={user.imageSrc}
        alt="user image"
      ></Image>
      <Text color="tea.green">
        <Link to={`${user.id}`}>{user.username}</Link>
      </Text>{" "}
      <HStack>
        <Text as="b" color="tea.matcha">
          Email:
        </Text>
        <Text color="tea.matcha">{user.email}</Text>
      </HStack>
      <HStack>
        <Text as="b" casing="capitalize" color="tea.matcha">
          Status:
        </Text>
        <Text casing="capitalize" color="tea.matcha">
          {user.role ? user.role : "Customer"}
        </Text>
      </HStack>
      <Spacer />
      <Link to={`${user.id}`}>
        <Button w="100%" maxW="200px" minW="150px" {...adminStyle()}>
          Options{" "}
        </Button>
      </Link>
    </VStack>
  ) : null;

  // return (
  //   <Gi>
  //     <VStack
  //       spacing="2px"
  //       align="start"
  //       as={Link}
  //       to={`/users/${user.id}`}
  //     >
  //       <Image boxSize="150px" src={user.imageSrc} alt="tea image" />
  //       <Heading color="tea.matcha">{user.name}</Heading>

  //       {!view && <Text fontSize="lg">${user.price}</Text>}
  //     </VStack>

  //     {!view && (
  //       <HStack>
  //         <Button marginTop="2" user={user} btnStyle="outline" />
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

//onClick={() => deleteuser(user.id)}

//        dispatch(_deleteProduct(id));

/*
<Button
          onClick={() => deleteUser(user.id)}
          colorScheme="red"
          borderRadius="5px"
          size="m"
          px="0.9rem"
          py="0.5rem"
        >
          Options{" "}
        </Button>
        */

/*
{auth.id && auth.role === "admin" && (

  admin stuff

  ) }
  */

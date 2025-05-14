import React from "react";
import {
  Box,
  Image,
  Text,
  Link,
  HStack,
  Button,
  Spacer,
  VStack,
  Center,
  Heading,
  Select,
} from "@chakra-ui/react";
import { GOT_USER, userState } from "../../reducers/userReducer";
import { useReducer, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userReducer, deleteUser } from "../../reducers/userReducer";
import { buttonStyle, adminStyle } from "../../Styles";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

export default function SingleUser(auth = { id: 1, role: "none" }) {
  const [users, dispatch] = useReducer(userReducer, userState);
  const { id } = useParams();
  const { me, loading } = useAuth();
  const navigate = useNavigate();
  let isAdmin = me ? me.role === "admin" : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/users/${id}`
        );
        dispatch({ type: GOT_USER, user: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (id, dispatch) => {
    console.log(dispatch);
    const result = await deleteUser(id, dispatch);
    console.log(result);
    // if (!result.success) {
    //   alert(result.message);
    // } else {
    //   alert(result.message);
    //   navigate("/");
    //   reset();
    // }
  };

  const user = users.singleUser;

  return me.id ? (
    <Center>
      <HStack justify="center" wrap="wrap">
        <VStack pl="30px" m="20px">
          <Image
            borderRadius="full"
            minW="200px"
            boxSize="200px"
            src="../../Black_Rose.png"
            bgImage={`../../${user.imageSrc}`}
            bgPosition="center"
            bgRepeat="no-repeat"
            alt="user image"
          ></Image>
          <HStack pt="20px" spacing="10px">
            {" "}
            <Text color="tea.green">ID#:</Text> <Spacer />
            <Text color="tea.matcha">{user.id}</Text> <Spacer />
            {me?.role === "admin" && (
              <Button onClick={() => onSubmit(user.id)} {...adminStyle()}>
                Remove User{" "}
              </Button>
            )}
          </HStack>
        </VStack>

        <VStack align="left" pr="30px" m="20px">
          <Heading size="lg" color="tea.matcha">
            {user.username}
          </Heading>
          <Text casing="capitalize" color="tea.brown">
            Status: {user.role ? user.role : "Customer"}
          </Text>{" "}
          <HStack>
            <Text as="b" color="tea.green">
              Email:
            </Text>{" "}
            <Spacer />
            <Text color="tea.green">{user.email}</Text> <Spacer />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  ) : (
    <Text pt="50px" align="center" color="tea.dark">
      Page not found. Return home.
    </Text>
  );
}

/*
{auth.id && auth.role === "admin" && (
  )}
*/

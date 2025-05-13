import React from "react";
import {
  Text,
  Box,
  Center,
  HStack,
  SimpleGrid as MyGrid,
} from "@chakra-ui/react";
import { userReducer, userState, GOT_USERS } from "../../reducers/userReducer";
import { useReducer, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import ListUser from "./ListUser";

export default function Users() {
  const [users, dispatch] = useReducer(userReducer, userState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/users`);
        dispatch({ type: GOT_USERS, users: data });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const { me, loading } = useAuth();
  let isAdmin = me ? me.role === "admin" : false;
  let userList = users.allUsers;
  console.log(userList);

  return (
    <div>
      {isAdmin && (
        <HStack justify="center" mx="30px" wrap="wrap">
          {users.allUsers[0]
            ? users.allUsers.map((user) => (
                <Box key={user.id} m="10px">
                  <ListUser key={user.id} user={user}>
                    {user.name}
                  </ListUser>
                </Box>
              ))
            : null}
        </HStack>
      )}
      {!isAdmin && <Text align="center">Access denied. Return home.</Text>}
    </div>
  );
}

/*

  return (
    <MyGrid minW="375px" m="30px" p="30px" gap="1.5rem" justifyContent="center">
      {products.allProducts[0]
        ? products.allProducts.map((product) => (
            <Center key={product.id}>
              <ListProduct key={product.id} product={product} />
            </Center>
          ))
        : null}
    </MyGrid>
    */

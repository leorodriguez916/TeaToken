import React from "react";
import { Button, HStack, Center } from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";
import { buttonStyle, adminStyle } from "../Styles";
import MyGrid from "../components/UI/MyGrid";

/*
<SimpleGrid
        columns={{ sm: 1, md: 4, lg: 4 }}
        spacing={1.5}
        ml="40px"
        mr="40px"
        mb="3rem"
      >
      */

export default function UserPage() {
  const isAdmin = true;

  return (
    <div>
      <Center>
        <HStack justify="center" mx="30px" mb="30px" wrap="wrap">
          <NavLink to="/account">
            <Button {...buttonStyle()}>Account Details </Button>
          </NavLink>
          <NavLink to="orders">
            <Button w="100%" {...buttonStyle()}>
              Order History{" "}
            </Button>
          </NavLink>
          <NavLink to="payments">
            <Button w="100%" {...buttonStyle()}>
              Manage Payments
            </Button>
          </NavLink>
          <NavLink to="signout">
            <Button w="100%" {...buttonStyle()}>
              Sign Out
            </Button>
          </NavLink>
          {isAdmin && (
            <NavLink to="users">
              <Button w="100%" {...adminStyle()}>
                Users List{" "}
              </Button>
            </NavLink>
          )}
        </HStack>
      </Center>
      <Outlet />
    </div>
  );
}

/*


<Flex
        ml="40px"
        mr="40px"
        mb="30px"
        gap={1.5}
        direction="column"
        align="center"
      >
        <NavLink to="orders">
          <Button minW="700px" {...buttonStyle()}>
            Order History{" "}
          </Button>
        </NavLink>
        <NavLink to="details">
          <Button minW="700px" {...buttonStyle()}>
            Account Details{" "}
          </Button>
        </NavLink>
        <NavLink to="payments">
          <Button minW="700px" {...buttonStyle()}>
            Manage Payments
          </Button>
        </NavLink>
        <NavLink to="signout">
          <Button minW="700px" {...buttonStyle()}>
            Sign Out
          </Button>
        </NavLink>
      </Flex>

      */

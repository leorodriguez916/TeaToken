import React, { useEffect, useState, useReducer, useParams } from "react";
import { Button, HStack, Center } from "@chakra-ui/react";
import { Outlet, NavLink } from "react-router-dom";
import { buttonStyle, adminStyle } from "../Styles";
import MyGrid from "../components/UI/MyGrid";
import { useAuth } from "../contexts/authContext";

export default function UserPage() {
  const { me, setMe, loading } = useAuth();
  let isAdmin = me ? me.role === "admin" : false;

  return me ? (
    <div>
      <Center>
        <HStack justify="center" mx="30px" mb="30px" wrap="wrap">
          <NavLink to={`/account/users/${me.id}`}>
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
          <NavLink to="../">
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setMe(null);
              }}
              w="100%"
              {...buttonStyle()}
            >
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
  ) : null;
}

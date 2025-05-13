import React, { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export default function AccountDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Text align="center">Details</Text>
    </div>
  );
}

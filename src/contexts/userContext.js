import React, { createContext, useReducer } from "react";
import { userReducer, userState } from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(userReducer, userState);

  return (
    <UserContext.Provider value={{ users, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

import axios from "axios";

//Action constants.
export const GOT_USER = "GOT_USER";
export const GOT_USERS = "GOT_USERS";
export const EDIT_USER = "EDIT_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USER = "DELETE_USER";

function _createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}

function _deleteUser(id) {
  return {
    type: DELETE_USER,
    id,
  };
}

// export function createUser(user) {
//   return async function (dispatch) {
//     try {
//       const { data } = await axios.post("http://localhost:3001/api/signup");
//       dispatch(_createUser(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// }

export const createUser = async (user, dispatch) => {
  console.log("Calling createUser with:", user);

  try {
    const { data } = await axios.post("http://localhost:3001/api/signup", {
      name: user.username,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      token: null,
      email: user.email,
      role: user.role,
    });
    console.log("Received response:", data);

    dispatch(_createUser(data));
    return { success: true, message: "New user created!" };
  } catch (err) {
    console.error("createUser error:", err.response?.data || err.message);

    return {
      success: false,
      message: err.response?.data,
      // err.response?.data?.error ||
      // "Something went wrong creating your account.",
    };
  }
};

// In code block above after URL
// user, {
//   headers: { authorization: localStorage.getItem("token") },
// }

export const userState = {
  allUsers: [],
  singleUser: {},
};

//Reducer.
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, singleUser: { ...action.user } };
    case GOT_USERS:
      return { ...state, allUsers: [...action.users] };
    case EDIT_USER:
      return;
    case CREATE_USER:
      return { ...state };
    case DELETE_USER:
      return;
    default:
      return;
  }
};

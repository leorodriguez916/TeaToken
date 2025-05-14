import axios from "axios";

//Action constants.
export const GOT_USER = "GOT_USER";
export const GOT_USERS = "GOT_USERS";
export const EDIT_USER = "EDIT_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USER = "DELETE_USER";
export const LOGIN_USER = "LOGIN_USER";

function _createUser(user) {
  return {
    type: CREATE_USER,
    user,
  };
}
function _loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

function _deleteUser(id) {
  return {
    type: DELETE_USER,
    id,
  };
}

export const deleteUser = async (id, dispatch) => {
  console.log("deleting user from reducer");
  console.log(dispatch);
  try {
    const { data } = await axios.delete(
      `http://localhost:3001/api/users/${id}`
    );
    dispatch(_deleteUser(id));

    return {
      success: true,
      message: "Delete successful.",
    };
  } catch (err) {
    console.error(err);
  }
};

export const loginUser = async (user, dispatch) => {
  console.log("Calling loginUser with:", user);

  try {
    const { data } = await axios.post("http://localhost:3001/api/login", {
      username: user.username,
      password: user.password,
    });
    console.log("Login success:", data);
    dispatch(_loginUser(user));

    //Return token to client with successful login message.
    return {
      success: true,
      message: "Login successful.",
      token: data.token,
      user: data.user,
    };
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data,
    };
  }
};

export const createUser = async (user, dispatch) => {
  console.log("Calling createUser with:", user);

  try {
    const { data } = await axios.post("http://localhost:3001/api/signup", {
      name: user.username,
      password: user.password,
      points: 200,
      email: user.email,
      role: user.role,
    });
    console.log("Received response:", data);

    dispatch(_createUser(data));
    return {
      success: true,
      message: `New user created! Starting points: 200. Please sign in with your login information.`,
    };
  } catch (err) {
    console.error("createUser error:", err.response?.data || err.message);

    return {
      success: false,
      message: err.response?.data,
    };
  }
};

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

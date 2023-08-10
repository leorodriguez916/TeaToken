//Action constants.
const GOT_USER = "GOT_USER";
const GOT_USERS = "GOT_USERS";
const EDIT_USER = "EDIT_USER";
const CREATE_USER = "CREATE_USER";
const DELETE_USER = "DELETE_USER";

const userState = {
  allUsers: [],
  singleUser: {},
};

//Reducer.
export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state };
    case GOT_USERS:
      return;
    case EDIT_USER:
      return;
    case CREATE_USER:
      return;
    case DELETE_USER:
      return;
    default:
      return;
  }
};

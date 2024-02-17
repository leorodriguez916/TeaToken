//Action constants.
export const GOT_USER = "GOT_USER";
export const GOT_USERS = "GOT_USERS";
export const EDIT_USER = "EDIT_USER";
export const CREATE_USER = "CREATE_USER";
export const DELETE_USER = "DELETE_USER";

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

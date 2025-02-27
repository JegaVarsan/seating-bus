import { authConstants } from "../constants";


let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user,
  loggedIn: user ? true : false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        error: action.error
      };
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

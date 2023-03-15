import { createStore } from "redux";

const initialState = {
  isauthenticated: false,
  userRole: "",
  userId: "",
  userName: "",
  userAddress: "",
};

function reducer(state = initialState, action) {
  const {
    isauthenticated = false,
    userRole = "",
    userId = "",
    userName = "",
    userAddress = "",
  } = action.payload || {};
  switch (action.type) {
    case "UPDATE_AUTH_DATA":
      return {
        isauthenticated: isauthenticated,
        userRole: userRole,
        userId,
        userName,
        userAddress,
      };
    default:
      return state;
  }
}

const userStore = createStore(reducer);

export default userStore;

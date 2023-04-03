import { createStore } from "redux";
import { fetchUserData } from "./actions/commonFunctions";

fetchUserData();

const initialState = {
  isauthenticated: false,
  userRole: "",
  userId: "",
  userName: "",
  userAddress: "",
  allProducts: [],
  cartCount: 0,
  userEmail: ""
};

function reducer(state = initialState, action) {
  const {
    isauthenticated = false,
    userRole = "",
    userId = "",
    userName = "",
    userAddress = "",
    allProducts = [],
    cartCount = 0,
    userEmail = "",
    phoneNumber = ""
  } = action.payload || {};
  switch (action.type) {
    case "UPDATE_AUTH_DATA":
      return {
        ...state,
        isauthenticated: isauthenticated,
        userRole: userRole,
        userId,
        userName,
        userAddress,
        userEmail,
        phoneNumber
      };
    case "GET_SEARCH_DATA":
      return {
        ...state,
        allProducts
      }
    case "CART_COUNT":
      return {
        ...state,
        cartCount
      }
    default:
      return state;
  }
}

const userStore = createStore(reducer);

export default userStore;

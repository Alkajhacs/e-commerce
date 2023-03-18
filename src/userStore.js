import { createStore } from "redux";
import axios from "axios";

let userData = {}

function fetchUserData() {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    axios
      .get(`http://localhost:8000/api/getuser/${userId}`)
      .then((response) => {
        userData = response.data
        const { user_mail = "", user_name = "", address = "", user_role = "" } = userData || {};
        const initialState = {
          isauthenticated: false,
          userRole: user_role,
          userId: userId,
          userName: user_name,
          userAddress: address,
          allProducts: [],
          cartCount: 0,
          userEmail: user_mail
        };
        userStore.dispatch({ type: "UPDATE_AUTH_DATA", payload: initialState });
      })
      .catch((error) => {
        console.log(error);
        userData = {}
      });
  }
}
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
    userEmail = ""
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
        userEmail
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

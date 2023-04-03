import axios from "axios";
import userStore from "../userStore";

export  function validateEmail(emailId) {
    //     ^ - The beginning of the string
    // [^\s@]+ - One or more characters that are not whitespace or @
    // @ - The @ symbol
    // [^\s@]+ - One or more characters that are not whitespace or @
    // \. - A literal dot (escaped with a backslash)
    // [^\s@]+ - One or more characters that are not whitespace or @
    // $ - The end of the string
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailId);
}

export function validatePhonenumber(phnNo) {
//     /^: Matches the start of the string.
// [6-9]: Matches a single digit that is either 6, 7, 8, or 9.
// \d{9}: Matches any 9 digits.
// $/: Matches the end of the string.
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phnNo);
}

export function fetchUserData() {
    let userData = {}
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`http://localhost:8000/api/getuser/${userId}`)
        .then((response) => {
          userData = response.data
          const { user_mail = "", user_name = "", address = "", user_role = "", phone_no = ""} = userData || {};
          const initialState = {
            isauthenticated: false,
            userRole: user_role,
            userId: userId,
            userName: user_name,
            userAddress: address,
            allProducts: [],
            cartCount: 0,
            userEmail: user_mail,
            phoneNumber: phone_no
          };
          userStore.dispatch({ type: "UPDATE_AUTH_DATA", payload: initialState });
        })
        .catch((error) => {
          userData = {}
        });
    }
  }
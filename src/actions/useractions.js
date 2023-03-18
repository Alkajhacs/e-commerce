export const updateAuthData = (data) => {
  return {
    type: "UPDATE_AUTH_DATA",
    payload: data,
  };
};

export const getSearchData = (data) => {
  return {
    type: "GET_SEARCH_DATA",
    payload: data,
  };
}

export const setCartCount = (data) => {
  return {
    type: "CART_COUNT",
    payload: data
  }
}

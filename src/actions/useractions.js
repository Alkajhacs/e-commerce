export const updateAuthData = (data) => {
  console.log("hello")
  console.log(data, "data")
  return {
    type: "UPDATE_AUTH_DATA",
    payload: data,
  };
};

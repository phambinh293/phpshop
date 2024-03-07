export const base_url = "https://localhost:7056/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.userDto.token : ""
    }`,
    Accept: "application/json",
  },
};
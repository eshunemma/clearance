import { jwtDecode } from "jwt-decode";

export const decodedToken = () => {
  return jwtDecode(localStorage.getItem("token"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export function getInitials(phrase) {
  return phrase
    .split(" ") // Split the phrase by spaces
    .map((word) => word[0].toUpperCase()) // Get the first letter of each word and make it uppercase
    .join("");
}

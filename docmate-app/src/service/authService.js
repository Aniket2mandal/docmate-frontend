import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login-user`, {
    email,
    password,
  });

  return response.data;
};
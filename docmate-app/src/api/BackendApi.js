import axiosInstance from "../service/axiosInstance";

export const getAllDoctors = (page = 0, size = 9) => {
  return axiosInstance.get(`/public/get-all-doctor?page=${page}&size=${size}`);
};

export const loginUser = (username, password) => {
  return axiosInstance.post("/auth/login-user", {
    username,
    password,
  });
};
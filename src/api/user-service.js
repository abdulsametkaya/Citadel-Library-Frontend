import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const adminUserAdd = (user) => {
  return axios.post(`${API_URL}/users/add`, user, { headers: authHeader() });
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getUser = () => {
  return axios.get(`${API_URL}/users`, { headers: authHeader() });
};

export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/users/${id}/auth`, user, {
    headers: authHeader(),
  });
};

export const updateUserMember = (user) => {
  return axios.patch(`${API_URL}/users`, user, { headers: authHeader() });
};

export const updatePassword = (payload) => {
  return axios.put(`${API_URL}/users/auth`, payload, {
    headers: authHeader(),
  });
};

export const deleteUser = (id, user) => {
  return axios.put(`${API_URL}/users/delete/${id}`, user, {
    headers: authHeader(),
  });
};

/* ADMIN SERVICES */
export const getUsers = () => {
  return axios.get(`${API_URL}/user/auth/all`, { headers: authHeader() });
};

export const getUsersByPage = (
  search,
  page = 0,
  size = 20,
  sort = "id",
  direction = "ASC"
) => {
  let query = "";
  if (search) query += `search=${search}&`;
  if (page) query += `page=${page}&`;
  if (size) query += `size=${size}&`;
  if (sort) query += `sort=${sort}&`;
  if (direction) query += `direction=${direction}`;
  return axios.get(`${API_URL}/users/page?${query}`, { headers: authHeader() });
};

export const downloadUsers = () => {
  return axios.get(`${API_URL}/excel/download/users`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "blob",
  });
};

export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`, { headers: authHeader() });
};

export const getUserLoans = () => {
  return axios.get(`${API_URL}/users/loans`, { headers: authHeader() });
};

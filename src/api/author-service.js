import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getAuthors = (
  page = 0,
  size = 20,
  sort = "id",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/authors?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
  );
};

export const getAuthorAll = () => {
  return axios.get(`${API_URL}/authors/allauthors`);
};

export const getAuthorById = (id) => {
  return axios.get(`${API_URL}/authors/get/${id}`, { headers: authHeader() });
};

export const createAuthor = (author) => {
  return axios.post(`${API_URL}/authors/add`, author, {
    headers: authHeader(),
  });
};

export const updateAuthor = (id, author) => {
  return axios.put(`${API_URL}/authors/${id}`, author, {
    headers: authHeader(),
  });
};

export const deleteAuthor = (id) => {
  return axios.delete(`${API_URL}/authors/${id}`, { headers: authHeader() });
};

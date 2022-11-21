import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getCategories = (
  page = 0,
  size = 20,
  sort = "name",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/categories?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
  );
};

export const getCategoriesAll = () => {
  return axios.get(`${API_URL}/categories/allcategories`);
};

export const getCategoryById = (id) => {
  return axios.get(`${API_URL}/categories/${id}`, {
    headers: authHeader(),
  });
};

export const createCategory = (category) => {
  return axios.post(`${API_URL}/categories/add`, category, {
    headers: authHeader(),
  });
};

export const updateCategory = (id, category) => {
  return axios.put(`${API_URL}/categories/${id}`, category, {
    headers: authHeader(),
  });
};
export const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/categories/${id}`, { headers: authHeader() });
};

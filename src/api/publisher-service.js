import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getPublishers = (
  page = 0,
  size = 20,
  sort = "name",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/publishers?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
  );
};

export const getPublisherAll = () => {
  return axios.get(`${API_URL}/publishers/allpublishers`);
};

export const getPublisherById = (id) => {
  return axios.get(`${API_URL}/publishers/${id}`, {
    headers: authHeader(),
  });
};

export const createPublisher = (publisher) => {
  return axios.post(`${API_URL}/publishers/add`, publisher, {
    headers: authHeader(),
  });
};

export const updatePublisher = (id, publisher) => {
  return axios.put(`${API_URL}/publishers/${id}`, publisher, {
    headers: authHeader(),
  });
};
export const deletePublisher = (id) => {
  return axios.delete(`${API_URL}/publishers/${id}`, { headers: authHeader() });
};

import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getReportAll = () => {
  return axios.get(`${API_URL}/report/all`);
};

export const getMostBorrowers = (
  page = 0,
  size = 6,
  sort = "amount",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/report/most-borrowers?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};

export const getUnreturnedBooks = (page = 0, size = 10) => {
  return axios.get(
    `${API_URL}/report/unreturned-books?page=${page}&size=${size}`,
    { headers: authHeader() }
  );
};

export const getMostPopularBooks = (page = 0, size = 10) => {
  return axios.get(`${API_URL}/report?page=${page}&size=${size}`, {
    headers: authHeader(),
  });
};

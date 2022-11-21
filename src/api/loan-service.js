import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const createLoan = (loan) => {
  return axios.post(`${API_URL}/loans/add`, loan, { headers: authHeader() });
};

export const setReturnLoan = (id, update) => {
  return axios.put(`${API_URL}/loans/update/${id}`, update, {
    headers: authHeader(),
  });
};

export const getLoansBookIdWithPage = (
  id,
  page = 0,
  size = 10,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans/book/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};

export const getUserLoansPage = (
  page = 0,
  size = 10,
  sort = "id",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};

export const getUserActiveLoans = () => {
  return axios.get(`${API_URL}/users/loans`,
   { headers: authHeader(), }
   );
};

export const getLoanAmountOfCategory = (page = 0, size = 6) => {
  return axios.get(`${API_URL}/loans/mostcategory?page=${page}&size=${size}`, {
    headers: authHeader(),
  });
};

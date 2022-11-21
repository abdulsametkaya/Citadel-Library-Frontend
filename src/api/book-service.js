import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getBooksAll = () => {
  return axios.get(`${API_URL}/books/allbooks`);
};
export const getMyBooks = (
  page = 0,
  size = 10,
  sort = "loanDate",
  direction = "ASC"
) => {
  return (
    axios.get(
      `${API_URL}/loans?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
    ),
    { headers: authHeader() }
  );
};

export const getBookById = (id) => {
  return axios.get(`${API_URL}/books/get/${id}`, { headers: authHeader() });
};

// All book get with page
export const getBooksAllPages = (
  page = 0,
  size = 10,
  sort = "name",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/books/bookspages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
  );
};

export const createBooks = (book) => {
  return axios.post(`${API_URL}/books/add`, book, { headers: authHeader() });
};

export const updateBook = (id, book) => {
  return axios.put(`${API_URL}/books/${id}`, book, { headers: authHeader() });
};

export const updateBookImage = (id, newImageFile) => {
  return axios.put(`${API_URL}/files/update/${id}`, newImageFile, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

export const uploadBookImage = (image) => {
  return axios.post(`${API_URL}/files/upload`, image, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

export const displayBookImage = (id) => {
  return axios.post(`${API_URL}/files/display/${id}`, {
    headers: { ...authHeader() },
  });
};

export const getAllBooksWithPage = (
  page = 0,
  size = 12,
  sort = "name",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/books/bookspages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
  );
};

export const deleteBook = (id, book) => {
  return axios.put(`${API_URL}/books/delete/${id}`, book, {
    headers: authHeader(),
  });
};

// Optional query parameters:
{
  /*
let query = "";
if(name) query += `name=${name}&`; 
if(cat) query += `cat=${cat}&`; 
.
.
.
return axios.get(`${API_URL}/books/all?${query}`); 
*/
}

export const getBooksWithPage = (
  name,
  cat,
  author,
  publisher,
  page = 0,
  size = 20,
  sort = "name",
  direction = "DESC"
) => {
  return axios.get(`${API_URL}/books/all`, {
    params: {
      ...(name && { name: name }),
      ...(cat && { cat: cat }),
      ...(author && { author: author }),
      ...(publisher && { publisher: publisher }),
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(sort && { sort: sort }),
      ...(direction && { direction: direction }),
    },
  });
};

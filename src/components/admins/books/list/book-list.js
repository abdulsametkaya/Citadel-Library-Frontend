import React, { useEffect, useState } from "react";
import "./book-list.scss";

import { Button, Container, Form, Toast, Stack } from "react-bootstrap";
import BookCardList from "./book-card-list";
import PaginationComp from "../../../common/pagination/pagination";
import { Link } from "react-router-dom";
import { getBooksAllPages } from "../../../../api/book-service";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchInput, setSearchInput] = useState("");
  let [allbooks, setAllBooks] = useState({});

  const loadData = async (page) => {
    try {
      const resp = await getBooksAllPages(page, 5);
      console.log(resp.data.content);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setBooks(content);
      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });

      const allBooks = await getBooksAllPages(0, resp.data.totalElements);

      setAllBooks(allBooks.data.content);
    } catch (err) {
      Toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const newBook = [];

    if (searchInput.length > 1) {
      allbooks.filter((book) => {
        if (
          book.name.toLowerCase().match(searchInput) ||
          book.authorName.toLowerCase().match(searchInput) ||
          book.categoryName.toLowerCase().match(searchInput) ||
          book.publisherName.toLowerCase().match(searchInput)
        ) {
          newBook.push(book);
        }
        setBooks(newBook);
      });
    } else {
      loadData(0, 5);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <div className="mb-4 book-search">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto"
            onChange={handleChange}
            placeholder="Search book name, author, publisher, category"
          />
          <div className="vr" />
          <div className="book-add-btn">
            <Button as={Link} to="/admin/newbook">
              Add
            </Button>
          </div>
        </Stack>
      </div>
      <Container className="admin-book-list-container">
        <div className="admin-book-list">
          {books.map((book) => (
            <BookCardList {...book} />
          ))}
        </div>
        <PaginationComp pagination={pagination} loadPageData={loadData} />
      </Container>
    </>
  );
};

export default BookList;

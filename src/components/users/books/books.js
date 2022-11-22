import React, { useEffect, useState } from "react";
import BookCard from "./book-card/book-card";
import "./books.scss";
import {  Col, Container, Form, Row } from "react-bootstrap";
import {
  getAllBooksWithPage,
  getBooksAll,
  getBooksWithPage,
} from "../../../api/book-service";
import Loading from "../../common/loading/loading";
import PaginationComp from "../../common/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { emptyAuthorBook } from "../../../store/slices/author-book-slice";
import { emptyCategoryBook } from "../../../store/slices/category-book-slice";
import { emptyPublisherBook } from "../../../store/slices/publisher-book-slice";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const authorId = useSelector((state) => state.authorBook);
  const categoryId = useSelector((state) => state.categoryBook);
  const publisherId = useSelector((state) => state.publisherBook);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const loadData = async (page) => {
    try {
      if (
        authorId.isAuthor ||
        categoryId.isCategory ||
        publisherId.isPublisher
      ) {
        const response = await getBooksWithPage(
          null,
          categoryId.id,
          authorId.id,
          publisherId.id,
          page
        );
        const {
          content,
          numberOfElements,
          size,
          totalElements,
          totalPages,
          pageable,
        } = response.data;

        setBooks(content);

        setPagination({
          numberOfElements,
          size,
          totalElements,
          totalPages,
          pageable,
        });

        dispatch(emptyPublisherBook());
        dispatch(emptyCategoryBook());
        dispatch(emptyAuthorBook());
      } else {
        const responseBook = await getAllBooksWithPage(page);

        const {
          content,
          numberOfElements,
          size,
          totalElements,
          totalPages,
          pageable,
        } = responseBook.data;

        setBooks(content);

        const responseAll = await getBooksAll();

        setAllBooks(responseAll.data);

        setPagination({
          numberOfElements,
          size,
          totalElements,
          totalPages,
          pageable,
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const newBooks = [];

    if (searchInput.length > 1) {
      allBooks.filter((book) => {
        if (
          book.name.toLowerCase().match(searchInput) ||
          book.authorName.toLowerCase().match(searchInput) ||
          book.categoryName.toLowerCase().match(searchInput) ||
          book.publisherName.toLowerCase().match(searchInput)
        ) {
          newBooks.push(book);
        }
        setBooks(newBooks);
      });
    } else {
      loadData(0, 12);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <div className="books">
        <div className="filter-menu">
          <Form.Control
            type="search"
            onChange={handleChange}
            placeholder="Search any book, author, category or publisher"
            aria-label="Search"
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Container className="book-cont">
            <Row md={3} lg={4} sm={2} xs={1} xxl={5} className="book-row">
              {books.map((book) => (
                <Col className="book-col" key={book.id}>
                  <BookCard
                    id={book.id}
                    title={book.name}
                    category={book.categoryName}
                    author={book.authorName}
                    shelfCode={book.shelfCode}
                    image={book.image_id}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </div>
      <PaginationComp pagination={pagination} loadPageData={loadData} />
    </>
  );
};

export default Books;

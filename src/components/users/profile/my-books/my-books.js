import React, { useEffect, useState } from "react";
import BookCard from "../book-card/book-card";
import { Container, Form, Stack, Toast } from "react-bootstrap";
import PaginationComp from "../../../common/pagination/pagination";
import { getUserLoansPage } from "../../../../api/loan-service";


const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [allBooks, setAllBooks] = useState([{}]);
  const [bl, setBl] = useState(false);

  const loadData = async (page) => {
    try {
      const resp = await getUserLoansPage(page, 5);
      console.log(resp.data.content);
      setBooks(resp.data.content);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setBooks(content);

      const responseAll = await getUserLoansPage(0, resp.data.totalElements);
      setAllBooks(responseAll.data.content);
      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (err) {
      Toast(err.response.data.message, "error");
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
          book.author.toLowerCase().match(searchInput) ||
          book.category.toLowerCase().match(searchInput) ||
          book.publisher.toLowerCase().match(searchInput)
        ) {
          newBooks.push(book);
        }
        setBooks(newBooks);
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
      <Container>
         <div className="mb-4 publisher-search">
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              onChange={handleChange}
              placeholder="Search User"
            />
          </Stack>
        </div>
        
        <div className="user-information-table">
          {books.map((book) => (<BookCard {...book} />))}
          <PaginationComp pagination={pagination} loadPageData={loadData} />
        </div>
      </Container>
    </>
  );
};

export default MyBooks;

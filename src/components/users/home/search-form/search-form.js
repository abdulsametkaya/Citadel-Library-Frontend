import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchBook } from "../../../../store/slices/book-slice";
import "./search-form.scss";

const SearchForm = (props) => {
  const { searchApi } = props;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const dispatch = useDispatch();
  const refInput = useRef();

  const loadData = async () => {
    try {
      const resp = await searchApi;
      setBooks(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let res = [];
    let oneBook = {
      id: 0,
      name: "",
    };
    setSearchInput(e.target.value);

    if (searchInput.length > 1) {
      books.filter((book) => {
        if (book.name.toLowerCase().match(searchInput)) {
          oneBook.name = book.name;
          oneBook.id = book.id;
          res.push(oneBook);
        }
        oneBook = {};
      });
    } else {
      setSearchResult({});
    }
    setSearchResult(res);
  };

  const handleClick = (id, name) => {
    const book = {
      id,
      name,
    };
    dispatch(searchBook(book));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container fluid className="search-form">
      <Row>
        <Col sm={4} className="search-top-text">
          <div>
            <div>Learn from the best. Anywhere</div>
            <span>Creative and business skills you can use today</span>
          </div>
        </Col>
        <Col sm={10} md={10} lg={6} className="search-bar">
          <InputGroup size="md">
            <Form.Control
              placeholder="Search With Book Name"
              onChange={handleChange}
              aria-describedby="basic-addon2"
              className="search-box"
              name="searchInput"
              value={searchInput}
            />
            <InputGroup.Text id="basic-addon2">
              <BiSearchAlt2 />
            </InputGroup.Text>
          </InputGroup>
          <div className="search-result">
            {searchResult.length > 0 ? (
              searchResult.map((result) => {
                return (
                  <Link
                    key={result.id}
                    className="search-div"
                    onClick={() => handleClick(result.id, result.name)}
                    ref={refInput}
                    id={result.id}
                    to={"/bookdetail"}
                  >
                    {result.name}
                  </Link>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchForm;

import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchBook } from "../../../store/slices/book-slice";
import "./search-form-book.scss";

const SearchFormBook = (props) => {
  const { searchApi } = props;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const dispatch = useDispatch();
  const refIcon = useRef();
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

  const handleIconClick = () => {
    const book = {
      id: refInput.current.id,
      name: refInput.current.innerText,
    };
    dispatch(searchBook(book));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container className="search-form-book">
      <Row>
        <Col>
          <div className="search-form-content">
            <InputGroup size="sm">
              <Form.Control
                placeholder="Search With Book Name"
                aria-describedby="basic-addon2"
                className="search-box"
                name="searchInput"
                onChange={handleChange}
                value={searchInput}
              />
              <Button
                ref={refIcon}
                as={Link}
                to={"/bookdetail"}
                onClick={() => handleIconClick()}
              >
                <BiSearchAlt2 />
              </Button>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchFormBook;

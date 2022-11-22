import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./book-details.scss";
import { getBookById } from "../../../../api/book-service";
import { getBookImage } from "../../../../utils/functions/book-img";
import { useDispatch, useSelector } from "react-redux";
import { emptySearchBook } from "../../../../store/slices/book-slice";
import Loading from "../../../common/loading/loading";
import NotFound from "../../../common/not-found/not-found";

const BookDetails = () => {
  const [loading, setLoading] = useState(false);
  const book = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    name: null,
    isbn: "",
    pageCount: "",
    publishDate: "",
    shelfCode: "",
    author_name: "",
    category_name: "",
    publisher_name: "",
    image: "",
    available: true,
  });

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getBookById(book.id);

      setInitialValues({
        name: resp.data.name,
        isbn: resp.data.isbn,
        pageCount: resp.data.pageCount,
        publishDate: resp.data.publishDate,
        shelfCode: resp.data.shelfCode,
        author_name: resp.data.authorName,
        category_name: resp.data.categoryName,
        publisher_name: resp.data.publisherName,
        image: resp.data.image_id,
        available: resp.data.loanable,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    dispatch(emptySearchBook());
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container className="book-list-container">
            <Row className="detail-parent-row">
              <Col>
                <img
                  src={getBookImage(initialValues.image)}
                  className="img-fluid"
                  alt="..."
                />
              </Col>
            </Row>
            <Row className="details-row" sm={1} xs={1} xxl={1} xl={1}>
              <Col className="details-input">
                <div className="details-first">Name:</div>
                <div className="details-last">{initialValues.name}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">ISBN:</div>
                <div className="details-last">{initialValues.isbn}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Page Count:</div>
                <div className="details-last">{initialValues.pageCount}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Publish Date:</div>
                <div className="details-last">{initialValues.publishDate}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Shelf Code:</div>
                <div className="details-last">{initialValues.shelfCode}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Author Name:</div>
                <div className="details-last">{initialValues.author_name}</div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Category Name:</div>
                <div className="details-last">
                  {initialValues.category_name}
                </div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Publisher Name:</div>
                <div className="details-last">
                  {initialValues.publisher_name}
                </div>
              </Col>
              <Col className="details-input">
                <div className="details-first">Availability:</div>
                <div
                  className={
                    initialValues.available
                      ? "details-last text-success"
                      : "details-last text-danger"
                  }
                >
                  {initialValues.available
                    ? "It is available to loan"
                    : "It is not available to loan"}
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default BookDetails;

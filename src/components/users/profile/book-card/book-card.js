import React from "react";
import {
  Container,
  Form,
  InputGroup,
  ListGroup,
  Navbar,
} from "react-bootstrap";
import { GoCalendar } from "react-icons/go";
import { BiSearchAlt2 } from "react-icons/bi";
import "./book-card.scss";
import { Link } from "react-router-dom";
import { getBookImage } from "../../../../utils/functions/book-img";
import moment from "moment";

const BookCard = (props) => {
  const { bookId, image_id, name, expireDate, returnDate, loanDate } = props;

  return (
    <Container>
      <div className="book-list">
        <div className="card mb-5 ">
          <div className="row">
            <div className="col-md-3 img">
              <Navbar.Brand as={Link} to={`/user/mybooks/${bookId}`}>
                <img src={getBookImage(image_id)} alt="..." />
              </Navbar.Brand>
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="card-text-group">
                  <p className="card-text">
                    <div className="row g-0">
                      <div className="col-md-6">
                        Loan Date <GoCalendar />{" "}
                        {moment(loanDate).format("DD-mm-yyyy")}
                      </div>
                      <div className="col-md-6">
                        Return Date
                        <GoCalendar />
                        {returnDate
                          ? moment(returnDate).format("DD-mm-yyyy")
                          : " Book Not Return"}
                      </div>
                    </div>
                  </p>
                  <p className="card-text">
                    <div className="row g-0">
                      <div className="col-md-6"> </div>
                      <div className="col-md-6"> </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookCard;

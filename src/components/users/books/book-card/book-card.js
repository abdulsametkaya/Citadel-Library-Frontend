import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchBook } from "../../../../store/slices/book-slice";
import { getBookImage } from "../../../../utils/functions/book-img";
import "./book-card.scss";

const BookCard = (props) => {
  const { id, title, category, image, shelfCode, author } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    const book = {
      id: id,
      name: title,
    };
    dispatch(searchBook(book));
  };

  return (
    <Card
      className="section-card"
      onClick={handleClick}
      as={Link}
      to={"/bookdetail"}
    >
      <Card.Body>
        <Card.Img variant="top" alt={title} src={getBookImage(image)} />
        <Card.Title>{title}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span>Author:</span> {author}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Cat:</span>
            {category}
          </ListGroup.Item>
          <ListGroup.Item>
            <span>Shelf Code:</span> {shelfCode}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BookCard;

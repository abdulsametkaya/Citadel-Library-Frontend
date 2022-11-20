import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";
import "./most-popular-swipe.scss";
import { Card, Container, ListGroup, Toast } from "react-bootstrap";
import cardImg from "../../../../assets/img/logo/img04.jpeg";
import anonim from "../../../../assets/img/logo/anonim-user.jpeg";
import { FaUsers } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MostPopularHeader from "./most-popular-header";
import { getMostPopularBooks } from "../../../../api/report-service";
import { getBookImage } from "../../../../utils/functions/book-img";
import { useDispatch } from "react-redux";
import { searchBook } from "../../../../store/slices/book-slice";
import { useRef } from "react";
import { Link } from "react-router-dom";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const MostPopularSwiper = () => {
  const swiperRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (id, name) => {
    const oneBook = {
      id: id,
      name: name,
    };
    dispatch(searchBook(oneBook));
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getMostPopularBooks();
      const { content } = resp.data;

      setBooks(content);
    } catch (err) {
      Toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="popular-book">
      <Container className="swiper-container">
        <MostPopularHeader title="Most Popular Books" />
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          slidesPerGroup={1}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {books.map((book) => (
            <SwiperSlide>
              <Card
                onClick={() => handleClick(book.id, book.name)}
                as={Link}
                to={"/bookdetail"}
                className="swiper-card"
                style={{ width: "16rem" }}
              >
                <Card.Img
                  variant="top"
                  className="book-mostpopular-img img-fluid"
                  src={getBookImage(book.image_id)}
                />
                <Card.Body>
                  <Card.Title>{book.name}</Card.Title>
                  <Card.Text className="author">
                    <img src={anonim} class="rounded" className="author-img" />
                    {book.authorName}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush"></ListGroup>
                <Card.Body className="ico">
                  <FaUsers />
                  <span> {book.amount}</span>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default MostPopularSwiper;

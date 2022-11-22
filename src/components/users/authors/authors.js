import React, { useEffect, useState } from "react";
import SectionHeader from "../common/section-header/section-header";
import "./authors.scss";
import Spacer from "../../common/spacer/spacer";
import { Col, Container, Row } from "react-bootstrap";
import SectionAvatar from "../common/section-avatar/section-avatar";
import { getAuthors } from "../../../api/author-service";
import Loading from "../../common/loading/loading";
import PaginationComp from "../../common/pagination/pagination";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authorBook } from "../../../store/slices/author-book-slice";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  const loadData = async (page) => {
    try {
      const response = await getAuthors(page, 15);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = response.data;

      setAuthors(content);

      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedAuthor = (id, name) => {
    const author = {
      id,
      name,
    };
    dispatch(authorBook(author));
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <SectionHeader title="Authors" image="header2.jpg" />
      <Spacer height={"50vh"} />
      {loading ? (
        <Loading />
      ) : (
        <Container className="a-avatar-cont">
          <Row
            className="avatar-row"
            xs={1}
            sm={2}
            md={2}
            lg={3}
            xl={3}
            xxl={4}
            xxxl={5}
          >
            {authors.map((author) => (
              <Col
                className="avatar-col"
                key={author.id}
                as={Link}
                to={"/books"}
                onClick={() => selectedAuthor(author.id, author.name)}
              >
                <SectionAvatar
                  id={author.id}
                  name={author.name}
                  image="profile-icon.jpg"
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
      <PaginationComp pagination={pagination} loadPageData={loadData} />
    </>
  );
};

export default Authors;

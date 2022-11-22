import React, { useEffect, useState } from "react";
import SectionHeader from "../common/section-header/section-header";
import "./publishers.scss";
import Spacer from "../../common/spacer/spacer";
import { Col, Container, Row } from "react-bootstrap";
import SectionAvatar from "../common/section-avatar/section-avatar";
import { getPublishers } from "../../../api/publisher-service";
import Loading from "../../common/loading/loading";
import PaginationComp from "../../common/pagination/pagination";
import { useDispatch } from "react-redux";
import { publisherBook } from "../../../store/slices/publisher-book-slice";
import { Link } from "react-router-dom";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  const loadData = async (page) => {
    try {
      const response = await getPublishers(page, 15);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = response.data;

      setPublishers(content);

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

  const selectedPublisher = (id, name) => {
    const publisher = {
      id,
      name,
    };
    dispatch(publisherBook(publisher));
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <SectionHeader title="Publishers" image="header2.jpg" />
      <Spacer height={"50vh"} />
      {loading ? (
        <Loading />
      ) : (
        <Container className="p-avatar-cont">
          <Row
            className="avatar-row"
            xl={3}
            xs={1}
            lg={3}
            md={2}
            sm={2}
            xxl={4}
            xxxl={5}
          >
            {publishers.map((publisher) => (
              <Col
                className="avatar-col"
                key={publisher.id}
                as={Link}
                to={"/books"}
                onClick={() => selectedPublisher(publisher.id, publisher.name)}
              >
                <SectionAvatar
                  id={publisher.id}
                  name={publisher.name}
                  image="publishers-icon.png"
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

export default Publishers;

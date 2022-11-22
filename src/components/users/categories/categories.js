import React, { useEffect, useState } from "react";
import SectionHeader from "../common/section-header/section-header";
import "./categories.scss";
import Spacer from "../../common/spacer/spacer";
import { Col, Container, Row } from "react-bootstrap";
import SectionAvatar from "../common/section-avatar/section-avatar";
import { getCategories } from "../../../api/category-service";
import Loading from "../../common/loading/loading";
import PaginationComp from "../../common/pagination/pagination";
import { useDispatch } from "react-redux";
import { categoryBook } from "../../../store/slices/category-book-slice";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const dispatch = useDispatch();

  const loadData = async (page) => {
    try {
      const response = await getCategories(page, 15);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = response.data;

      setCategories(content);

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

  const selectedCategory = (id, name) => {
    const category = {
      id,
      name,
    };
    dispatch(categoryBook(category));
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <SectionHeader title="Categories" image="header2.jpg" />
      <Spacer height={"50vh"} />
      {loading ? (
        <Loading />
      ) : (
        <Container className="c-avatar-cont">
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
            {categories.map((category) => (
              <Col
                className="avatar-col"
                as={Link}
                to={"/books"}
                key={category.id}
                onClick={() => selectedCategory(category.id, category.name)}
              >
                <SectionAvatar
                  id={category.id}
                  name={category.name}
                  image="book-icon.jpg"
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

export default Categories;

import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask-next";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "../../../../utils/functions/swal";
import "./new-book-create.scss";
import { getAuthorAll } from "../../../../api/author-service";
import { getPublisherAll } from "../../../../api/publisher-service";
import { getCategoriesAll } from "../../../../api/category-service";
import { createBooks, uploadBookImage } from "../../../../api/book-service";
import { useNavigate } from "react-router-dom";

const NewBookCreate = () => {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();
  const navigate = useNavigate();

  const loadAuthors = async () => {
    try {
      const resp = await getAuthorAll();

      setAuthors(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPublishers = async () => {
    try {
      const resp = await getPublisherAll();

      setPublishers(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const resp = await getCategoriesAll();

      setCategories(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
    loadPublishers();
    loadCategories();
  }, []);

  const initialValues = {
    name: "",
    isbn: "",
    pageCount: "",
    publishDate: "",
    shelfCode: "",
    author_id: "",
    category_id: "",
    publisher_id: "",
    image: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter book name"),
    isbn: Yup.string().required("Please enter isbn"),
    pageCount: Yup.number().required("Please enter book pages"),
    publishDate: Yup.number().required("Please enter publish year"),
    shelfCode: Yup.string()
      .required("Please enter shelf code")
      .matches(/[A-Z]+[A-Z]+[-]+\d+\d+\d/, "Exp:AB-123"),
    author_id: Yup.number().required("Please enter author "),
    category_id: Yup.number().required("Please enter category"),
    publisher_id: Yup.number().required("Please enter publisher"),
    image: Yup.mixed().required("Please select an image"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", values.image);
      const resp = await uploadBookImage(formData);
      const imageId = resp.data;

      const payload = {
        name: values.name,
        isbn: values.isbn,
        pageCount: values.pageCount,
        publishDate: values.publishDate,
        shelfCode: values.shelfCode,
        author_id: values.author_id,
        image_id: imageId,
        category_id: values.category_id,
        publisher_id: values.publisher_id,
      };

      await createBooks(payload);
      toast("Book was created", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    formik.setFieldValue("image", file);
    //formik state ini manuel olarak set ettik.Seçilen dosyayı image alanına yerleştirdik.

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  };

  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  return (
    <Container className="book-create-container">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col xl={3} className="image-area">
            <Form.Control
              type="file"
              name="image"
              className="d-none"
              onChange={handleImageChange}
              ref={fileImageRef}
            />
            <img src={imageSrc} className="img-fluid" alt="..." />
            {formik.errors.image && (
              <Badge bg="danger" className="image-area-error">
                Please select an image
              </Badge>
            )}
            <Button
              variant={formik.errors.image ? "danger" : "primary"}
              onClick={handleSelectImage}
            >
              Select Image
            </Button>
          </Col>
          <Col xl={9}>
            <Row>
              <Form.Group as={Col} md={6} lg={6} className="mb-3">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("name")}
                  className={isError("name") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} lg={6} className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  as={InputMask}
                  mask="999-99-99999-99-9"
                  {...formik.getFieldProps("isbn")}
                  className={isError("isbn") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.isbn}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={4} className="mb-3">
                <Form.Label>Page Count</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("pageCount")}
                  className={isError("pageCount") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.pageCount}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={4} className="mb-3">
                <Form.Label>Publish Date</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("publishDate")}
                  className={isError("publishDate") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.publishDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={4} className="mb-3">
                <Form.Label>Shelf Code</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("shelfCode")}
                  className={isError("shelfCode") && "is-invalid"}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.shelfCode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} lg={6} className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("author_id")}
                  className={isError("author_id") && "is-invalid"}
                >
                  <option>Select Author</option>
                  {authors.map((author) => (
                    <option value={author.id}>{author.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.author}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} lg={6} className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("category_id")}
                  className={isError("category_id") && "is-invalid"}
                >
                  <option>Select Category</option>
                  {categories.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.category_id}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={6} lg={6} className="mb-3">
                <Form.Label>Publishers </Form.Label>
                <Form.Select
                  {...formik.getFieldProps("publisher_id")}
                  className={isError("publisher_id") && "is-invalid"}
                >
                  <option>Select Publishers</option>
                  {publishers.map((publisher) => (
                    <option value={publisher.id}>{publisher.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.publisher_id}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <div className="text-end">
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />} Save
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    </Container>
  );
};
export default NewBookCreate;

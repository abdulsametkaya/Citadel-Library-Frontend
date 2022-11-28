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
  Alert,
  Container,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { question, toast } from "../../../../utils/functions/swal";
import "./book-detail.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBook,
  getBookById,
  updateBook,
  updateBookImage,
} from "../../../../api/book-service";
import { getBookImage } from "../../../../utils/functions/book-img";
import { getAuthorAll } from "../../../../api/author-service";
import { getPublisherAll } from "../../../../api/publisher-service";
import { getCategoriesAll } from "../../../../api/category-service";
import BookLoans from "./loan/book-loans";
import LoanAdd from "./loan/loan-add";
import { useSelector } from "react-redux";
let isImageChanged = false;

const BookDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileImageRef = useRef();
  const navigate = useNavigate();
  const { bookdetailId } = useParams();


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

  const [initialValues, setInitialValues] = useState({
    name: "",
    isbn: "",
    pageCount: "",
    publishDate: "",
    shelfCode: "",
    author_id: "",
    category_id: "",
    publisher_id: "",
    image: "",
  });

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
  });

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      let imageId = values.image_id;
      if (isImageChanged) {
        const newImageFile = fileImageRef.current.files[0];
        const formData = new FormData();
        formData.append("file", newImageFile);
        await updateBookImage(imageId, formData);
        isImageChanged = false;
      }
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

      await updateBook(bookdetailId, payload);
      toast("Book was updated", "success");
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    isImageChanged = true;
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getBookById(bookdetailId);
      setInitialValues(resp.data);
      console.log(resp.data);
      setImageSrc(getBookImage(resp.data.image_id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async () => {
    setDeleting(true);
    try {
      const resp = await deleteBook(bookdetailId, initialValues);
      toast("Book was deleted", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeBook();
      }
    });
  };

  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  useEffect(() => {
    loadData();
    loadAuthors();
    loadPublishers();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <loading />
  ) : (
    <Container className="admin-book-list-container">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <fieldset disabled={initialValues.builtIn}>
          <Row>
            <Col xl={3} className="image-area">
              <Form.Control
                type="file"
                name="image"
                className="d-none"
                onChange={handleImageChange}
                ref={fileImageRef}
              />
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <img src={imageSrc} className="img-fluid" alt="..." />
              )}

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
                <Form.Group as={Col} md={6} lg={6} className="mb-3">
                  <Form.Label>Publish Year</Form.Label>
                  <Form.Control
                    type="number"
                    {...formik.getFieldProps("publishDate")}
                    className={isError("publishDate") && "is-invalid"}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.publishDate}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  lg={6}
                  className="mb-3"
                ></Form.Group>
                <Form.Group as={Col} md={6} lg={6} className="mb-3">
                  <Form.Label>&nbsp;</Form.Label>
                  <div className="text-end">
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </Button>
                      {!initialValues.builtIn && (
                        <>
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={saving || user.roles != "Administrator"}
                          >
                            {saving && <Spinner animation="border" size="sm" />}{" "}
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            disabled={deleting || user.roles != "Administrator"}
                            onClick={handleDelete}
                          >
                            {deleting && (
                              <Spinner animation="border" size="sm" />
                            )}{" "}
                            Delete
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </div>
                </Form.Group>
              </Row>
            </Col>
          </Row>
        </fieldset>
        {initialValues.builtIn && (
          <Alert variant="danger" className="mt-5">
            Built-in Book can not be deleted and updated
          </Alert>
        )}
      </Form>
      <Container className="loan-area">
        {initialValues.loanable || showForm ? (
          <LoanAdd bookdetailId={bookdetailId} />
        ) : (
          ""
        )}
      </Container>
      <BookLoans bookdetailId={bookdetailId} setShowForm={setShowForm} />
    </Container>
  );
};

export default BookDetail;

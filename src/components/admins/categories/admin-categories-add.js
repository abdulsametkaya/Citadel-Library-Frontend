import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal, Spinner, Stack } from "react-bootstrap";
import { toast } from "../../../utils/functions/swal";
import { createCategory } from "../../../api/category-service";

const AdminCategoriesAdd = (props) => {
  const { addBtn, setAddBtn } = props;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAddBtn(false);
  };
  const handleShow = () => setShow(true);

  const handleModal = () => {
    addBtn ? handleShow() : setShow(false);
  };

  const initialValues = {
    name: "",
    sequence: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter the category name"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("sequence", 0);
      await createCategory(formData);
      toast("Category was created", "success");
      setSaving(!saving);
      setShow(false);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    handleModal();
  }, [addBtn]);

  return (
    <div className="mb-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={formik.handleSubmit}
          >
            {loading && <Spinner animation="border" size="sm" />} Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminCategoriesAdd;

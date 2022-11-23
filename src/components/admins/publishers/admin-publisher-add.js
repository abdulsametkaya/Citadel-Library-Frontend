import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Modal, Spinner, Stack } from "react-bootstrap";
import { createPublisher } from "../../../api/publisher-service";
import { toast } from "../../../utils/functions/swal";

const AdminPublisherAdd = (props) => {
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
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter the publisher name"),
  });

  const onSubmit = async (values) => {
    console.log("deneme");
    setLoading(true);
    try {
      await createPublisher(values);
      toast("Publisher was created", "success");
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
          <Modal.Title>Add New Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Publisher Name"
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

export default AdminPublisherAdd;

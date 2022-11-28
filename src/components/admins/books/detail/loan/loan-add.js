import { useFormik } from 'formik';
import React, { useState } from 'react'
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "../../../../../utils/functions/swal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./loan-add.scss";
import { createLoan } from '../../../../../api/loan-service';

const LoanAdd = (props) => {
  const [loading, setLoading] = useState(false);
  const { bookdetailId} = props;
  const navigate = useNavigate();


  const initialValues = {
    userId: "",
    notes: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.number().required("Please enter member id"),
    notes: Yup.string().required("Please enter note"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const payload = {
        userId: values.userId,
        bookId: bookdetailId,
        notes: values.notes,
      };
      await createLoan(payload);
      toast("Loan was created", "success");
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

  
  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };
  return (
    <>
      <hr></hr>
      <h4>Loan Form</h4>
      <Form noValidate onSubmit={formik.handleSubmit} className="loan-form">
        <Row>
          <Col xl={12}>
            <Row>
              <Form.Group as={Col} md={12} lg={2} className="mb-3">
                <Form.Label>Member Id</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("userId")}
                  className={isError("userId") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.userId}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={12} lg={10} className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("notes")}
                  className={isError("notes") && "is-invalid"}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.notes}
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
    </>
  );
};

export default LoanAdd
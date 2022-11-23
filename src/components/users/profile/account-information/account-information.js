import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner, Toast } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordInput from "../../../common/password-input/password-input";
import { getUser, updatePassword } from "../../../../api/user-service";
import { toast } from "../../../../utils/functions/swal";
import "./account-information.scss"
import { useEffect } from "react";

const AccountInformation = () => {
  const [loading, setLoading] = useState(false);

      const loadData = async () => {
        setLoading(true);
        try {
          const resp = await getUser();
          setInitialValues(resp.data);
        } catch (err) {
          Toast(err.response.data.message, "error");
        } finally {
          setLoading(false);
        }
      };

  const [initialValues, setInitialValues] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    retryPassword: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    retryPassword: Yup.string()
      .required("Please re-enter your new password")
      .oneOf([Yup.ref("newPassword")], "Password fields doesn't match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const payload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
  
    try {
      await updatePassword(payload);
      toast("Your password was updated successfully", "success");
      formik.resetForm();
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
    enableReinitialize: true,
  });

   useEffect(() => {
     loadData();
   }, []);
  
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Container className="container-account">
        <div className="user-information-table">
          <Row className="row-form">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && formik.errors.email}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <PasswordInput
                  {...formik.getFieldProps("oldPassword")}
                  isInvalid={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                  isValid={
                    formik.touched.oldPassword && !formik.errors.oldPassword
                  }
                  error={formik.errors.oldPassword}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <PasswordInput
                  {...formik.getFieldProps("newPassword")}
                  isInvalid={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                  isValid={
                    formik.touched.newPassword && !formik.errors.newPassword
                  }
                  error={formik.errors.newPassword}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Retry Password</Form.Label>
                <PasswordInput
                  {...formik.getFieldProps("retryPassword")}
                  isInvalid={
                    formik.touched.retryPassword && formik.errors.retryPassword
                  }
                  isValid={
                    formik.touched.retryPassword && !formik.errors.retryPassword
                  }
                  error={formik.errors.retryPassword}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                
              >
                {loading && <Spinner animation="border" size="sm" />} Update
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </Form>
  );
};

export default AccountInformation;

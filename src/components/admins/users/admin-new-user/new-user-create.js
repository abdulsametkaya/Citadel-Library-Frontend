import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask-next";
import { Form, Button, Spinner, Modal, Col } from "react-bootstrap";
import PasswordInput from "../../../common/password-input/password-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "../../../../utils/functions/swal";
import { adminUserAdd } from "../../../../api/user-service";
import "./new-user-create.scss";

const NewUserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saving, setSaving] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    resetPasswordCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string().required(),
    address: Yup.string()
      .required("Please enter your address")
      .min(10, "Must be at least 10 characters"),
    resetPasswordCode: Yup.string().required(
      "Please enter your reset password code"
    ),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password fields doesn't match"),
    roles: Yup.string().required("Please select a role"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      phone: values.phoneNumber,
      birthDate: "2022-10-28T10:43:28.768Z",
      createDate: "2022-10-28T10:43:28.768Z",
      email: values.email,
      password: values.password,
      resetPasswordCode: values.resetPasswordCode,
      roles: values.roles,
    };
    try {
      await adminUserAdd(payload);
      toast("Creation completed successfully!", "success");
      formik.resetForm();
      setSaving(!saving);
      setShow(false);
    } catch (err) {
      toast(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="user-add-btn">
        <Button onClick={handleShow} >
          Add
        </Button>
      </div>
      <Modal className="admin-user-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("firstName")}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
                isValid={formik.touched.firstName && !formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("lastName")}
                isInvalid={formik.touched.lastName && formik.errors.lastName}
                isValid={formik.touched.lastName && !formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="999-999-9999"
                {...formik.getFieldProps("phoneNumber")}
                isInvalid={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                isValid={
                  formik.touched.phoneNumber && !formik.errors.phoneNumber
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("address")}
                isInvalid={formik.touched.address && formik.errors.address}
                isValid={formik.touched.address && !formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Reset Password Code</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("resetPasswordCode")}
                isInvalid={
                  formik.touched.resetPasswordCode &&
                  formik.errors.resetPasswordCode
                }
                isValid={
                  formik.touched.resetPasswordCode &&
                  !formik.errors.resetPasswordCode
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.resetPasswordCode}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
                isValid={formik.touched.email && !formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Password</Form.Label>
              <PasswordInput
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
                isValid={formik.touched.password && !formik.errors.password}
                error={formik.errors.password}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <PasswordInput
                {...formik.getFieldProps("confirmPassword")}
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                isValid={
                  formik.touched.confirmPassword &&
                  !formik.errors.confirmPassword
                }
                error={formik.errors.confirmPassword}
              />
            </Form.Group>
            <Form.Group as={Col} md={6} lg={4} className="mb-3">
              <Form.Label>Roles</Form.Label>
              <div>
                <Form.Check
                  label="Member"
                  type="radio"
                  name="roles"
                  value="Member"
                  checked={formik.values.roles.includes("Member")}
                  onChange={formik.handleChange}
                />
                <Form.Check
                  label="Admin"
                  type="radio"
                  name="roles"
                  value="Administrator"
                  checked={formik.values.roles.includes("Administrator")}
                  onChange={formik.handleChange}
                />
                <Form.Check
                  label="Staff"
                  type="radio"
                  name="roles"
                  value="Staff"
                  checked={formik.values.roles.includes("Staff")}
                  onChange={formik.handleChange}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />} Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NewUserCreate;

import React, { useState } from "react";
import { useFormik } from "formik";
import { Form, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../../../common/password-input/password-input";
import { getUser, login } from "../../../../api/user-service";
import { toast } from "../../../../utils/functions/swal";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../../../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalClose = () => {
    props.handleClose();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const respAuth = await login(values);
      secureLocalStorage.setItem("token", respAuth.data.token);

      const respUser = await getUser();
      dispatch(loginSuccess(respUser.data));

      modalClose();
    } catch (err) {
      dispatch(loginFailed());
      toast("error");
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
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-2">
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
      <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
          error={formik.errors.password}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading && <Spinner animation="border" size="sm" />} Login
      </Button>
    </Form>
  );
};

export default LoginForm;

import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Toast,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../utils/functions/swal";
import { getUser, updateUserMember } from "../../../../api/user-service";
import ReactInputMask from "react-input-mask";
import "./profile-form.scss";

const UserProfile = (user) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getUser();
      setInitialValues({
        firstName: resp.data.firstName,
        lastName: resp.data.lastName,
        phone: resp.data.phone,
        address: resp.data.address,
        email: resp.data.email,
      });
    } catch (err) {
      Toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phone: Yup.string()
      .required()
      .test(
        "includes_",
        "Please enter your phone number",
        (value) => value && !value.includes("_")
      ),
    address: Yup.string().required("Please enter your address"),
  });
  const onSubmit = async (values) => {
    setSaving(true);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
      email: values.email,
    };
    try {
      await updateUserMember(payload);
      toast("Your profile was updated successfully", "success");
    } catch (err) {
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

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Container className="container-form">
        <div className="user-information-table">
          <Row className="row-form">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  isValid={formik.touched.firstName && !formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  as={ReactInputMask}
                  mask="999-999-9999"
                  placeholder="Phone Number"
                  {...formik.getFieldProps("phone")}
                  isInvalid={formik.touched.phone && formik.errors.phone}
                  isValid={formik.touched.phone && !formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
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
              <div></div>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                  isInvalid={formik.touched.lastName && formik.errors.lastName}
                  isValid={formik.touched.lastName && !formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  disabled
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && formik.errors.email}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving && <Spinner animation="border" size="sm" />} Update
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </Form>
  );
};

export default UserProfile;

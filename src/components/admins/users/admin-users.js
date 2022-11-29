import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
  Stack,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  deleteUser,
  getUserById,
  getUsersByPage,
  updateUser,
} from "../../../api/user-service";
import ReactInputMask from "react-input-mask";
import Loading from "../../common/loading/loading";
import { question, toast } from "../../../utils/functions/swal";
import { FaTrashAlt } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./admin-users.scss";
import NewUserCreate from "./admin-new-user/new-user-create";
import { useSelector } from "react-redux";
import moment from "moment";
import PasswordInput from "../../common/password-input/password-input";

const AdminUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const [usr, setUser] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchInput, setSearchInput] = useState("");
  let [allUsers, setAllUsers] = useState({});

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          variant="outline-warning"
          className="user-edit-btn"
          disabled={user.roles != "Administrator"}
          onClick={() => {
            loadUpdateModal(row.id);
          }}
          id={row.ID}
        >
          Edit
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button
          variant="danger"
          className="user-del-btn"
          disabled={user.roles != "Administrator"}
          onClick={() => {
            handleDelete(row.id);
          }}
          id={row.ID}
        >
          <FaTrashAlt />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const loadData = async (page, size) => {
    try {
      setLoading(true);
      const resp = await getUsersByPage(null, page, size);
      setUsers(resp.data.content);
      setTotalRows(resp.data.totalElements);

      const allResponse = await getUsersByPage(
        null,
        0,
        resp.data.totalElements
      );

      setAllUsers(allResponse.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    score: null,
    roles: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    phoneNumber: Yup.string("Please enter phone number").required(),
    email: Yup.string().email().required("Please enter email"),
    address: Yup.string().required("Please enter address"),
    score: Yup.number().required("Please enter score"),
    roles: Yup.string().required("Please select a role"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
  });

  const onSubmit = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      phone: values.phoneNumber,
      email: values.email,
      score: values.score,
      roles: values.roles,
      password: values.password,
      birthDate: usr.birthDate,
      createDate: usr.createDate,
      resetPasswordCode: usr.resetPasswordCode,
      isActive: usr.isActive,
      builtIn: usr.builtIn,
    };

    try {
      setLoading(true);
      console.log(payload);
      await updateUser(usr.id, payload);
      toast("User updated successfully", "success");
      setSaving(!saving);
      setShow(false);
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

  const removeUser = async (id, usr) => {
    try {
      setLoading(true);
      const response = await getUserById(id);
      usr = response.data;
      await deleteUser(id, usr);
      toast("User deleted successfully", "success");
      setSaving(!saving);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, usr) => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeUser(id, usr);
      }
    });
  };

  const loadUpdateModal = async (id) => {
    try {
      handleShow();
      setLoading(true);
      const resp = await getUserById(id);
      setUser(resp.data);
      setInitialValues({
        firstName: resp.data.firstName,
        lastName: resp.data.lastName,
        phoneNumber: resp.data.phone,
        email: resp.data.email,
        address: resp.data.address,
        score: resp.data.score,
        roles: resp.data.roles[0],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    loadData(page - 1, perPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    loadData(page - 1, newPerPage);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const newUsers = [];

    if (searchInput.length > 1) {
      allUsers.filter((usr) => {
        if (
          usr.firstName.toLowerCase().match(searchInput) ||
          usr.lastName.toLowerCase().match(searchInput) ||
          usr.email.toLowerCase().match(searchInput)
        ) {
          newUsers.push(usr);
        }
        setUsers(newUsers);
      });
    } else {
      loadData(0, perPage);
    }
  };

  useEffect(() => {
    loadData(0, perPage);
  }, [saving]);

  return (
    <>
      <div className="mb-4 publisher-search">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto"
            onChange={handleChange}
            placeholder="Search User"
          />
          <div className="vr" />
          <div className="search-btn">
            <NewUserCreate />
          </div>
        </Stack>
      </div>

      <div className="user-table">
        <DataTable
          columns={columns}
          data={users}
          progressPending={loading}
          progressComponent={<Loading />}
          pagination
          paginationServer
          highlightOnHover
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
      <Modal className="admin-user-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
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
                  as={ReactInputMask}
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  disabled
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && formik.errors.email}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
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
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("score")}
                  isInvalid={formik.touched.score && formik.errors.score}
                  isValid={formik.touched.score && !formik.errors.score}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.score}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <PasswordInput
                  {...formik.getFieldProps("password")}
                  isInvalid={formik.touched.password && formik.errors.password}
                  isValid={formik.touched.password && !formik.errors.password}
                  error={formik.errors.password}
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
            </Row>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner animation="border" size="sm" />} Save Changes
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={handleClose}
              disabled={loading}
            >
              {loading && <Spinner animation="border" size="sm" />} Close
            </Button>
            {usr.builtIn && (
              <Alert variant="danger" onClick={handleClose}>
                Built-in accounts can not be deleted and updated
              </Alert>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AdminUsers;

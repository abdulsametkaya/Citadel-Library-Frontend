import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal, Stack, Toast } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Loading from "../../common/loading/loading";
import "./admin-categories.scss";
import { FaTrashAlt } from "react-icons/fa";
import { question, toast } from "../../../utils/functions/swal";
import { useNavigate } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../api/category-service";
import AdminCategoriesAdd from "./admin-categories-add";
import { useSelector } from "react-redux";

const AdminCategories = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addBtn, setAddBtn] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [show, setShow] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchInput, setSearchInput] = useState("");
  let [allUsers, setAllUsers] = useState({});

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await getCategories(page, perpage);
      setCategories(resp.data.content);
      setTotalRows(resp.data.totalElements);

      const allResponse = await getCategories(0, resp.data.totalElements);
      console.log(allResponse.data.content);
      setAllUsers(allResponse.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Category Name",
      selector: (row) => row.name,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          variant="outline-warning"
          className="cat-edit-btn"
          disabled={user.roles != "Administrator"}
          onClick={() => {
            handleEdit(row);
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
          disabled={user.roles != "Administrator"}
          variant="danger"
          className="cat-del-btn"
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

  const removeCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      toast("Category was deleted successfully", "warning");
      setSaving(!saving);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeCategory(id);
      }
    });
  };

  const handleUpdate = async () => {
    const value = ref.current.value;
    try {
      setLoading(true);
      const newCategory = {
        id: category.id,
        name: value,
        builtIn: category.builtIn,
        sequence:category.sequence,
      };
      await updateCategory(category.id, newCategory);
      toast("Category was updated successfully", "success");
      setSaving(!saving);
      setShow(false);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setCategory(row);
    handleShow();
  };

    const handleBtn = () => {
    setAddBtn(true);
  };

  const handlePageChange = (page) => {
    loadData(page - 1);
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
      allUsers.filter((user) => {
        if (user.name.toLowerCase().match(searchInput)) {
          newUsers.push(user);
        }
        setCategories(newUsers);
      });
    } else {
      loadData(0, perPage);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                disabled
                defaultValue={category.id}
                className="mb-5"
              />
              <Form.Control
                type="text"
                placeholder="Category Name"
                autoFocus
                defaultValue={category.name}
                ref={ref}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            {" "}
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mb-4 category-search">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto"
            onChange={handleChange}
            placeholder="Search Category"
          />
          <div className="vr" />
          <div className="category-add-btn">
            <Button onClick={handleBtn}>Add</Button>
          </div>
        </Stack>
      </div>

      <AdminCategoriesAdd addBtn={addBtn} setAddBtn={() => setAddBtn()} />

      <div className="category-table">
        <DataTable
          columns={columns}
          data={categories}
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
    </>
  );
};

export default AdminCategories;

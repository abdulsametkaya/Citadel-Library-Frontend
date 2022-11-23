import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../../../api/author-service";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Loading from "../../common/loading/loading";
import { FaTrashAlt } from "react-icons/fa";
import { question, toast } from "../../../utils/functions/swal";
import AdminAuthorAdd from "./admin-author-add";
import "./admin-author.scss";
import { useSelector } from "react-redux";

const AdminAuthor = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [addBtn, setAddBtn] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState({});
  const [show, setShow] = useState(false);
  const ref = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchInput, setSearchInput] = useState("");
  let [allUsers, setAllUsers] = useState({});

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await getAuthors(page, perpage);
      setAuthors(resp.data.content);
      setTotalRows(resp.data.totalElements);

       const allResponse = await getAuthors(0, resp.data.totalElements);
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
      name: "Author Name",
      selector: (row) => row.name,
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button
          variant="outline-warning"
          className="aut-edit-btn"
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
          className="aut-del-btn"
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

  const removeAuthor = async (id) => {
    try {
      setLoading(true);
      await deleteAuthor(id);
      toast("Author was deleted successfully", "warning");
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
        removeAuthor(id);
      }
    });
  };

  const handleUpdate = async () => {
    const value = ref.current.value;
    try {
      setLoading(true);
      const newAuthor = {
        id: author.id,
        name: value,
        builtIn: author.builtIn,
      };
      await updateAuthor(author.id, newAuthor);
      toast("Author was updated successfully", "success");
      setSaving(!saving);
      setShow(false);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    setAuthor(row);
    handleShow();
  };

  const handleBtn = () => {
    setAddBtn(true);
  };

  const handlePageChange = (page) => {
    // Data table 1 tabanlı, bizim api 0 tabanlı
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
        if (
          user.name.toLowerCase().match(searchInput)
        ) {
          newUsers.push(user);
        }
        setAuthors(newUsers);
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
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Author ID"
                disabled
                defaultValue={author.id}
                className="mb-5"
              />
              <Form.Control
                type="text"
                placeholder="Author Name"
                autoFocus
                defaultValue={author.name}
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

      <div className="mb-4 author-search">
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            className="me-auto"
            onChange={handleChange}
            placeholder="Search Author"
          />
          <div className="vr" />
          <div className="author-add-btn">
            <Button onClick={handleBtn}>Add</Button>
          </div>
        </Stack>
      </div>

      <AdminAuthorAdd addBtn={addBtn} setAddBtn={() => setAddBtn()} />

      <div className="author-table">
        <DataTable
          columns={columns}
          data={authors}
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

export default AdminAuthor;

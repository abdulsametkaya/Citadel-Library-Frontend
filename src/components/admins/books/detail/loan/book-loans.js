import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  getLoansBookIdWithPage,
  setReturnLoan,
} from "../../../../../api/loan-service";
import moment from "moment";
import { Button } from "react-bootstrap";
import { toast } from "../../../../../utils/functions/swal";
import "./book-loans.scss";

const BookLoans = (props) => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [saving, setSaving] = useState(false);
  const [returned, setReturned] = useState(false);
  const navigate = useNavigate();
  const { bookdetailId, setShowForm } = props;

  const handleSetReturnLoan = async (id, update) => {
    console.log(update);
    setSaving(true);
    try {
      const resp = await setReturnLoan(id, update);
      toast("Loan was returned", "success");
      setShowForm(true);
      setReturned(!returned);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      name: "User",
      selector: (row) => row.user.firstName + " " + row.user.lastName,
      width: "25%",
    },
    {
      name: "Loan Date",
      selector: (row) => moment(row.loanDate).format("DD-MM-YYYY"),
      width: "22.5%",
    },
    {
      name: "Expire Date",
      selector: (row) => moment(row.expireDate).format("DD-MM-YYYY"),
      width: "22.5%",
    },
    {
      name: "Return Date",
      selector: (row) =>
        row.returnDate ? (
          moment(row.returnDate).format("DD-MM-YYYY")
        ) : (
          <Button
            variant="outline-success"
            className="retun-loan-btn"
            onClick={() => handleSetReturnLoan(row.id, "update")}
          >
            Set as returned
          </Button>
        ),
      width: "25%",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const loadData = async (page, perpage) => {
    try {
      setLoading(true);
      const resp = await getLoansBookIdWithPage(bookdetailId, page, perpage);
      setLoans(resp.data.content);
      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    loadData(0, perPage);
  }, []);

  useEffect(() => {
    loadData(0, perPage);
  }, [returned]);

  return (
    <div>
      <hr></hr>
      <DataTable
        columns={columns}
        data={loans}
        progressPending={loading}
        progressComponent={<loading />}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default BookLoans;

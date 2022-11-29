import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getUnreturnedBooks } from "../../../api/report-service";
import Loading from "../../common/loading/loading";
import "./unreturn-table.scss";
const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Page",
    selector: (row) => row.pageCount,
  },
  {
    name: "Author",
    selector: (row) => row.authorName
  },
  {
    name: "Category",
    selector: (row) => row.categoryName,
  },
];

const UnreturnTable = () => {
  const [loading, setLoading] = useState(false);
  const [unreturnedBooks, setUnreturnedBooks] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const loadData = async (page, perpage) => {
    try {
      setLoading(true);
      const resp = await getUnreturnedBooks(page, perpage);
      console.log(resp.data.content);
      setUnreturnedBooks(resp.data.content);
      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  const handleEdit = (row) => {
    navigate(`/admin/books/${row.id}`);
  };

  useEffect(() => {
    loadData(0, perPage);
  }, []);

  return (
    <div className="unreturn-table">
      <DataTable
        columns={columns}
        data={unreturnedBooks}
        progressPending={loading}
        progressComponent={<Loading />}
        onRowClicked={handleEdit}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default UnreturnTable;

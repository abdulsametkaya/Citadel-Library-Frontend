import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  getUserActiveLoans
} from "../../../../api/loan-service";
import moment from "moment";
import Loading from "../../../common/loading/loading";
import { getUserLoans } from "../../../../api/user-service";



const UserActiveLoansList = () => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);
 

  const columns = [
    {
      name: "Book Name",
      selector: (row) => row.name,
      width: "40%",
    },
    {
      name: "Loan Date",
      selector: (row) => moment(row.loanDate).format("DD-MM-YYYY"),
      width: "30%",
    },
    {
      name: "Expire Date",
      selector: (row) => moment(row.expireDate).format("DD-MM-YYYY"),
      width: "30%",
    },
  ];
  const loadData = async () => {
    try {
      setLoading(true);
      const resp = await getUserActiveLoans();
      setLoans(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Active Leased Books</h3>
      <hr></hr>
        <DataTable
          columns={columns}
          data={loans}
          progressPending={loading}
          progressComponent={<Loading />}

          highlightOnHover
        />
    </div>
  );
};

export default UserActiveLoansList;

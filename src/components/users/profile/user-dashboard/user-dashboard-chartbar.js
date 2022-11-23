import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getLoanAmountOfCategory } from "../../../../api/loan-service";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboardChartBar = () => {
   const [loading, setLoading] = useState(false);
  const [loansAmountOfCat, setLoansAmountOfCat] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getLoanAmountOfCategory();
      setLoansAmountOfCat(resp.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  useEffect(() => {
    loadData();
  }, []);

  const labels = [...loansAmountOfCat.map((item) => item.category)];

  ChartJS.defaults.font.size = 14;
  ChartJS.defaults.font.weight = "bold";
  const data = {
    labels,
    datasets: [
      {
        label: "Category Name",
        data: [...loansAmountOfCat.map((item) => item.bookAmount)],
        backgroundColor: "rgba(255,192,0)",
        maxBarThickness: 30,
      },
    ],
  };

  return (
    <>
      <h3 style={{fontSize: "1.5rem"}}>Loans Amount Of Category</h3>
      <Bar options={options} data={data} />
    </>
  );
};
export default UserDashboardChartBar;

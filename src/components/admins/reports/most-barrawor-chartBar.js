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
import { getMostBorrowers } from "../../../api/report-service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MostBorrowersChartBar = () => {
  const [loading, setLoading] = useState(false);
  const [mostBorrowers, setMostBorrowers] = useState([]);

  const loadData = async (page, number) => {
    setLoading(true);
    try {
      const resp = await getMostBorrowers(page, number);
      setMostBorrowers(resp.data.content);
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
    loadData(0, 5);
  }, []);

  const labels = [...mostBorrowers.map((item) => item.firstName)];

  ChartJS.defaults.font.size = 18;
  ChartJS.defaults.font.weight = "bold";
  let data = {
    labels,
    datasets: [
      {
        label: "Most Borrowers",
        data: [...mostBorrowers.map((item) => item.amount)],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        maxBarThickness: 40,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default MostBorrowersChartBar;

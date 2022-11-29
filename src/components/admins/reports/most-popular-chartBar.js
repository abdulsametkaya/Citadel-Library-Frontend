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
import { getMostPopularBooks } from "../../../api/report-service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MostPopularChartBar = () => {
  const [loading, setLoading] = useState(false);
  const [mostPopular, setMostPopular] = useState([]);

  const loadData = async (page, number) => {
    setLoading(true);
    try {
      const resp = await getMostPopularBooks(page, number);
      setMostPopular(resp.data.content);
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

  const labels = [...mostPopular.map((item) => item.name)];

  ChartJS.defaults.font.size = 18;
  ChartJS.defaults.font.weight = "bold";
  const data = {
    labels,
    datasets: [
      {
        label: "Most Popular Books",
        data: [...mostPopular.map((item) => item.amount)],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        maxBarThickness: 40,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default MostPopularChartBar;

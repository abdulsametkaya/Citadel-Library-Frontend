import React, { useEffect, useState } from "react";
import { Pie,Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getMostBorrowers } from "../../../api/report-service";
import Loading from "../../common/loading/loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = (props) => {
  const{dataCat}= props;
  const [loading, setLoading] = useState(false);
  const data = {
    labels: [...dataCat.map((item) => item.category)],
    datasets: [
      {
        label: "of Votes",
        data: [...dataCat.map((item) => item.bookAmount)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Pie
          data={data}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
             plugins: {
              legend: {
              display: false,
            },}
            
          }}
        />
      )}
    </div>
  );
};

export default ChartPie;

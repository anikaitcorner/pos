import React from "react";
import { Line } from "react-chartjs-2";

const data = [
  {
    date: "09-01-2022",
    amount: 1999,
  },
  {
    date: "09-02-2022",
    amount: 1500,
  },
  {
    date: "09-03-2022",
    amount: 2000,
  },
  {
    date: "09-04-2022",
    amount: 2300,
  },
  {
    date: "09-05-2022",
    amount: 2100,
  },
  {
    date: "09-06-2022",
    amount: 2200,
  },
];

const LineChart: React.FC = () => {
  return (
    <Line
      data={{
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Amount",
            data: data.map((item) => item.amount),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }}
      options={{
        responsive: true,

        scales: {
          x: {
            beginAtZero: true,
            border: {
              color: "#ccc",
            },
          },
          y: {
            beginAtZero: true,
            border: {
              color: "#ccc",
            },
          },
        },
        backgroundColor: "#fff",
        borderColor: "#fff",
        font: {
          style: "italic",
        },
      }}
    />
  );
};

export default LineChart;

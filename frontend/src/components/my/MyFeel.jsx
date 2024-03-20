import styles from "./MyFeel.module.css";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MyFeel({ feel }) {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["개빡침", "덜빡침", "적당함", "좀좋음", "개좋음"],
        datasets: [
          {
            label: "My First Dataset",
            data: [3000, 500, 100, 100, 300],
            backgroundColor: [
              "#9a5cff",
              "#e59cff",
              "#fbdfff",
              "#ffd4ca",
              "#ffb0b0",
            ],
            hoverOffset: 4,
          },
        ],
      },

      options: {
        legend: {
          labels: {
            fontColor: "#9a5cff",
            fontSize: 18,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
}

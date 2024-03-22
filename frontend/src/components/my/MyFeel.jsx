import styles from "./MyFeel.module.css";
import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function MyFeel({ feel }) {
  const [chartOptions, setChartOptions] = useState({
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        id: "radar-chart",
        toolbar: { show: false },
      },
      stroke: {
        show: true,
        width: 0,
        dashArray: 0,
      },
      fill: {
        opacity: 1,
        colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
      },
      colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "0.5rem",
          fontFamily: "GongGothicMedium",
        },
      },
      labels: ["개빡침", "덜빡침", "그럭저럭", "좋음", "쌉행복"],
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
        fontSize: "15px",
        fontFamily: "GongGothicMedium",
        labels: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        },
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
    },
    series: [3, 2, 6, 4, 103],
  });

  return (
    <>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="donut"
      />
    </>
  );
}

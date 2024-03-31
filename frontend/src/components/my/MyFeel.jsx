import styles from "./MyFeel.module.css";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { mooddata } from "../../api/Member";

export default function MyFeel() {
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
      labels: ["very bad", "bad", "soso", "good", "very good"],
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
    series: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const fetchdiary = async () => {
      const currentDate = new Date();
      const today = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      };

      try {
        const feel = await mooddata(today);
        const { veryBad, bad, soso, good, veryGood } = feel.data;
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [veryBad, bad, soso, good, veryGood],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchdiary();
  }, []);

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

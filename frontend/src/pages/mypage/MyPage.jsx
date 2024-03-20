import Container from "../../components/common/Container";
import styles from "./MyPage.module.css";
import Nav from "../../components/common/Nav";
import Header from "../../components/common/Header";
import Box from "../../components/common/Box";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MyPage() {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "radar",
      data: {
        labels: ["단맛", "쓴맛", "신맛", "도수", "탄산"],
        datasets: [
          {
            label: "My First Dataset",
            data: [80, 20, 70, 20, 80],
            // fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              backdropColor: "rgba(12, 13, 13, 0)",
              color: "rgba(12, 13, 13, 0)",
              fontSize: 145,
            },
            color: "#ffffff",
          },
        },
      },
      //   options: {
      //     scales: {
      //       r: {
      //         ticks: {
      //           color: "#ffffff", // 여기서 원하는 색상으로 변경할 수 있어
      //         },
      //       },
      //     },
      //   },
    });
  }, []);
  return (
    <Container>
      <Header>
        <div className={styles.title}>마이페이지</div>
      </Header>
      <div className={styles.main}>
        <Box>
          <div className={styles.chart}>
            <canvas ref={chartRef} />
          </div>
        </Box>
      </div>
      <Nav num={5} />
    </Container>
  );
}

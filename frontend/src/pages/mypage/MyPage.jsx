import Container from "../../components/common/Container";
import styles from "./MyPage.module.css";
import Nav from "../../components/common/Nav";
import Header from "../../components/common/Header";
import Box from "../../components/common/Box";
import arrow from "../../assets/common/arrow2.png";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Lottie from "lottie-react";
import Cocktail1 from "../../assets/lottie/Cocktail1.json";
import Cocktail2 from "../../assets/lottie/Cocktail2.json";

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
        <div className={styles.profile}>
          <div className={styles.profile_left}>
            <div>이미지</div>
            <div>
              <div>서또카늘</div>
              <div className={styles.profile_email}>seo_m98@naver.com</div>
            </div>
          </div>
          <div className={styles.profile_right}>
            <div>이미지</div>
            <div>이미지</div>
          </div>
        </div>

        <Box>
          <div className={styles.recommendTitle}>
            <div>나의 취향</div>
            <div>취향 칵테일 보러가기</div>
          </div>
          <div className={styles.recommend}>
            <div className={styles.chart}>
              <canvas ref={chartRef} />
            </div>
            <div className={styles.data}>
              <div>신맛ㅋㅋ</div>
              <div>신맛ㅋㅋ</div>
              <div>신맛ㅋㅋ</div>
              <div>신맛ㅋㅋ</div>
              <div>신맛ㅋㅋ</div>
            </div>
          </div>
          <div className={styles.changePreference}>취향변경</div>
        </Box>
        <div className={styles.flex}>
          <div className={styles.con}>
            <div className={styles.myCocktail}>
              <div>마신 칵테일</div>
              <img src={arrow} alt="arrow" className={styles.arrow_icon} />
            </div>
            <Lottie animationData={Cocktail1} className={styles.lottie} />
          </div>
          <div className={styles.con}>
            <div className={styles.likeCocktail}>
              <div>좋아요</div>
              <img src={arrow} alt="arrow" className={styles.arrow_icon} />
            </div>
            <Lottie animationData={Cocktail2} className={styles.lottie} />
          </div>
        </div>
        <Box>
          <div className={styles.feel}>
            <div>나의 기분</div>
            <img src={arrow} alt="arrow" className={styles.arrow_icon} />
          </div>
        </Box>
      </div>
      <Nav num={5} />
    </Container>
  );
}

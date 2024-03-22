import Container from "../../components/common/Container";
import styles from "./MyPage.module.css";
import Nav from "../../components/common/Nav";
import Header from "../../components/common/Header";
import Box from "../../components/common/Box";
import arrow from "../../assets/common/arrow2.png";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import Lottie from "lottie-react";
import Cocktail1 from "../../assets/lottie/Cocktail1.json";
import Cocktail2 from "../../assets/lottie/Cocktail2.json";
import MyFeel from "../../components/my/MyFeel";
import profile from "../../assets/common/profile.png";
import setting from "../../assets/common/setting.png";
import logout from "../../assets/common/logout.png";

export default function MyPage() {
  const [chartOptions, setChartOptions] = useState({
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        width: "10%",
        id: "radar-chart",
        toolbar: { show: false },
        style: {
          margin: "300px",
        },
      },
      xaxis: {
        categories: ["단맛", "쓴맛", "신맛", "도수", "탄산"],
        labels: {
          style: {
            colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
            fontSize: "0.8rem",
            fontFamily: "GongGothicMedium",
          },
        },
      },
      yaxis: {
        max: 120,
        min: 0,
        stepSize: 20,
        labels: {
          style: {
            colors: [
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
            ],
            fontSize: "0.8rem",
            fontFamily: "GongGothicMedium",
          },
        },
      },
      // dataLabels: {
      //   enabled: true,
      //   background: {
      //     enabled: true,
      //     borderRadius: 2,
      //   },
      // },
      markers: {
        size: 3,
        hover: {
          size: 10,
        },
        colors: "#a4b8ff",
        strokeColors: "#bb7ef8",
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#464a6d"],
        dashArray: 0,
      },
      fill: {
        opacity: 0.7,
        colors: ["#9c9ec6"],
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              colors: ["#fafaff", "#e6e7ff"],
              fontFamily: "GongGothicMedium",
            },
          },
        },
      },
    },
    series: [
      {
        name: "",
        data: [80, 20, 60, 40, 100],
      },
    ],
  });
  return (
    <Container>
      <Header>
        <div className={styles.title}>마이페이지</div>
      </Header>
      <div className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.profile_left}>
            <img src={profile} alt="profile" className={styles.profile_img} />
            <div>
              <div>서또카늘</div>
              <div className={styles.profile_email}>seo_m98@naver.com</div>
            </div>
          </div>
          <div className={styles.profile_right}>
            <img src={setting} alt="setting" className={styles.setting} />
            <img src={logout} alt="logout" className={styles.logout} />
          </div>
        </div>
        <Box>
          <div className={styles.recommendTitle}>
            <div>나의 취향</div>
            <div>취향 칵테일 보러가기</div>
          </div>
          <div className={styles.recommend}>
            <div className={styles.chart}>
              <Chart
                className={styles.chartC}
                options={chartOptions.options}
                series={chartOptions.series}
                type="radar"
                width={230}
                height={230}
              />
            </div>
            <div className={styles.data}>
              <div>단맛 : 80%</div>
              <div>쓴맛 : 20%</div>
              <div>신맛 : 60%</div>
              <div>도수 : 40%</div>
              <div>탄산 : 100%</div>
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
          <div className={styles.feelChart}>
            <MyFeel />
          </div>
        </Box>
      </div>
      <Nav num={5} />
    </Container>
  );
}

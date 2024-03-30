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
import setting from "../../assets/common/setting.png";
import logout from "../../assets/common/logout.png";
import edit from "../../assets/common/edit.png";
import { useNavigate } from "react-router-dom";
import { alctalk, opttalk } from "../../components/data/searchtalk";

import useUserStore from "../../store/useUserStore";

export default function MyPage() {
  const user = useUserStore((state) => state.user);
  const [chartOptions, setChartOptions] = useState({
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        id: "radar-chart",
        toolbar: { show: false },
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
        min: -20,
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
        data: [
          user.sweet * 20,
          user.bitter * 20,
          user.sour * 20,
          user.alc * 15,
          user.sparking * 20,
        ],
      },
    ],
  });
  const navigate = useNavigate();

  return (
    <Container>
      <Header>마이페이지</Header>
      <div className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.profile_left}>
            <img
              src={user.profileImageUrl}
              alt="profile"
              className={styles.profile_img}
            />
            <div>
              <div>{user.nickname}</div>
              <div className={styles.profile_email}>{user.email}</div>
            </div>
          </div>
          <div className={styles.profile_right}>
            <img
              src={setting}
              alt="setting"
              className={styles.setting}
              onClick={() => navigate("/settings")}
            />
            <img src={logout} alt="logout" className={styles.logout} />
          </div>
        </div>
        <Box>
          <div className={styles.recommendTitle}>
            <div>나의 취향</div>
            <div
              className={styles.button}
              onClick={() => navigate("recommend")}
            >
              취향 칵테일 보러가기
            </div>
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
              <div>단맛 : {chartOptions.series[0].data[0]}%</div>
              <div>쓴맛 : {chartOptions.series[0].data[1]}%</div>
              <div>신맛 : {chartOptions.series[0].data[2]}%</div>
              <div>도수강도 : {[user.alc]}</div>
              <div>탄산 : {chartOptions.series[0].data[4]}%</div>
            </div>
          </div>
          <div
            className={styles.changePreference}
            onClick={() => navigate("../preference")}
          >
            <img src={edit} alt="edit" className={styles.edit_icon} />
            <div>취향변경</div>
          </div>
        </Box>
        <div className={styles.flex}>
          <div className={styles.con} onClick={() => navigate("mycocktail")}>
            <div className={styles.myCocktail}>
              <div>마신 칵테일</div>
              <img src={arrow} alt="arrow" className={styles.arrow_icon} />
            </div>
            <Lottie animationData={Cocktail1} className={styles.lottie} />
          </div>
          <div className={styles.con} onClick={() => navigate("likedcocktail")}>
            <div className={styles.likeCocktail}>
              <div>좋아요</div>
              <img src={arrow} alt="arrow" className={styles.arrow_icon} />
            </div>
            <Lottie animationData={Cocktail2} className={styles.lottie} />
          </div>
        </div>
        <Box>
          <div className={styles.feel} onClick={() => navigate("monthlymood")}>
            <div>나의 기분</div>
            <img src={arrow} alt="arrow" className={styles.arrow_icon} />
          </div>
          <div
            className={styles.feelChart}
            onClick={() => navigate("monthlymood")}
          >
            <MyFeel />
          </div>
        </Box>
      </div>
      <Nav num={5} />
    </Container>
  );
}
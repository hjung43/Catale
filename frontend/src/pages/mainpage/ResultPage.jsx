import ContainerMain from "../../components/common/ContainerMain";
import styles from "./ResultPage.module.css";
import Nav from "../../components/common/Nav";
import React, { useEffect, useState } from "react";
import Headerwb from "../../components/common/Headerwb";
import { cocktailtoday } from "../../api/Diary";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import s from "classnames";
import { mood1, mood2 } from "../mainpage/Emodata/Emotionthree";

export default function ResultPage() {
  const [emotions, setEmotions] = useState([]);
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const fetchCocktailToday = async () => {
      const currentDate = new Date();
      const today = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      };
      console.log(today);

      try {
        const response = await cocktailtoday(today);
        setResultData(response.data);
        console.log(response.data); // 데이터 확인용
        setEmotions(
          [
            response.data.emotion1,
            response.data.emotion2,
            response.data.emotion3,
          ].filter((ele) => ele !== 0)
        );
      } catch (error) {
        console.error("Error fetching cocktail today:", error);
      }
    };

    fetchCocktailToday();
  }, []);
  const glasses = [
    glass1,
    glass1,
    glass2,
    glass3,
    glass4,
    glass5,
    glass6,
    glass7,
  ];
  const num = [
    [],
    [35, 45, 60],
    [48, 55, 62],
    [48, 55, 62],
    [40, 53, 65],
    [30, 45, 65],
    [35, 45, 55],
    [25, 40, 55],
  ];
  console.log(emotions);
  // cocktail.glass 값과 num 배열의 인덱스를 검증합니다.
  const validGlassIndex =
    resultData.glass >= 0 && resultData.glass < num.length;
  const numIndex = validGlassIndex ? resultData.glass : 0;
  const glassCoverStyle = `linear-gradient(180deg, ${resultData.color3} ${num[numIndex][0]}%, ${resultData.color2} ${num[numIndex][1]}%, ${resultData.color1} ${num[numIndex][2]}%, ${resultData.color1} 100%)`;
  return (
    <ContainerMain>
      <Headerwb title={"오늘의 결과"} />
      <div className={styles.main}>
        <div className={styles.title}>
          기분좋고 행복한 <br />
          서또카늘님에게 딱맞는 칵테일을 찾았어요!
        </div>
        <div className={styles.card}>
          <div className={styles.cocktail}>
            <div
              className={styles.glass_cover}
              style={{
                background: glassCoverStyle,
              }}
            >
              <img
                src={glasses[resultData.glass]}
                alt="glass"
                className={styles.glass}
              />
            </div>
            <div className={styles.name}>{resultData.name}</div>
            <div className={styles.content}>{resultData.content}</div>
            <div className={styles.cocktail_bottom}>
              <div className={styles.cocktail_left}>
                {emotions.map((emo, i) => {
                  const index = (emo - (emo % 10)) / 10;
                  const j = emo % 10;
                  return <div>{mood1[index][j]}</div>;
                })}
              </div>
              <div className={styles.cocktail_right}></div>
            </div>
          </div>
        </div>
        <div className={styles.a}>칵테일이름과 비슷한 칵테일</div>
        <div className={styles.a}>대충 맵</div>
      </div>
    </ContainerMain>
  );
}

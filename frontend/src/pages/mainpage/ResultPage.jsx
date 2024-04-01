import ContainerMain from "../../components/common/ContainerMain";
import styles from "./ResultPage.module.css";
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
import like from "../../assets/common/like.png";
import s from "classnames";
import { mood1, mood2 } from "../mainpage/Emodata/Emotionthree";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const [emotions, setEmotions] = useState([]);
  const [list, setList] = useState([]);
  const [resultData, setResultData] = useState({});

  useEffect(() => {
    const fetchCocktailToday = async () => {
      const currentDate = new Date();
      const today = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      };

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
        setList(response.data.recommendedCocktailList);
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

  const validGlassIndex =
    resultData.glass >= 0 && resultData.glass < num.length;
  const numIndex = validGlassIndex ? resultData.glass : 0;
  const glassCoverStyle = `linear-gradient(180deg, ${resultData.color3} ${num[numIndex][0]}%, ${resultData.color2} ${num[numIndex][1]}%, ${resultData.color1} ${num[numIndex][2]}%, ${resultData.color1} 100%)`;
  return (
    <ContainerMain>
      <Headerwb title={"오늘의 결과"} />
      <div className={styles.main}>
        <div className={styles.title}>
          기분좋고 행복한 하루에
          <br />
          딱맞는 칵테일을 찾았어요!
        </div>
        <div
          className={styles.card}
          onClick={() => navigate(`/cocktail/${resultData.cocktailId}`)}
        >
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
              <div></div>
            </div>
          </div>
        </div>
        <div className={styles.subTitle}>
          {resultData.name}와(과) 비슷한 칵테일
        </div>
        <div className={styles.container_box}>
          <div className={styles.container}>
            {list.map((cocktail, i) => {
              const validGlassIndex2 =
                cocktail.glass >= 0 && cocktail.glass < num.length;
              const numIndex2 = validGlassIndex2 ? cocktail.glass : 0;
              const glassCoverStyle2 = `linear-gradient(180deg, ${cocktail.color3} ${num[numIndex2][0]}%, ${cocktail.color2} ${num[numIndex2][1]}%, ${cocktail.color1} ${num[numIndex2][2]}%, ${cocktail.color1} 100%)`;
              return (
                <div
                  className={styles.box}
                  key={i}
                  onClick={() => navigate(`/cocktail/${cocktail.cocktailId}`)}
                >
                  <div
                    className={styles.glass_cover}
                    style={{
                      background: glassCoverStyle2,
                    }}
                  >
                    <img
                      src={glasses[cocktail.glass]}
                      alt="glass"
                      className={styles.glass}
                    />
                  </div>
                  <div className={styles.text}>{cocktail.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ContainerMain>
  );
}

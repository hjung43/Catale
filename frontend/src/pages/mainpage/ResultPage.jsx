import ContainerMain from "../../components/common/ContainerMain";
import styles from "./ResultPage.module.css";
import Nav from "../../components/common/Nav";
import React, { useEffect, useState } from "react";
import Headerwb from "../../components/common/Headerwb";
import { cocktailtoday } from "../../api/Diary";

export default function ResultPage() {
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
        setResultData(response.data); // 데이터를 상태에 저장
        console.log(response.data); // 데이터 확인용
      } catch (error) {
        console.error("Error fetching cocktail today:", error);
      }
    };

    fetchCocktailToday();
  }, []);

  return (
    <ContainerMain>
      <Headerwb title={"오늘의 결과"} />
      <div className={styles.main}>
        <div className={styles.title}>
          기분좋고 행복한 <br />
          서또카늘님에게 딱맞는 칵테일을 찾았어요!
        </div>
        {resultData.name}
        <div className={styles.a}>대충 칵테일 사진</div>
        <div className={styles.a}>칵테일이름과 비슷한 칵테일</div>
        <div className={styles.a}>대충 맵</div>
      </div>
    </ContainerMain>
  );
}

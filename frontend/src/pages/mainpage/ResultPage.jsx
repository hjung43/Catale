import ContainerMain from "../../components/common/ContainerMain";
import styles from "./ResultPage.module.css";
import Nav from "../../components/common/Nav";
import React from "react";
import Headerwb from "../../components/common/Headerwb";

export default function ResultPage() {
  return (
    <ContainerMain>
      <Headerwb title={"오늘의 결과"} />
      <div className={styles.main}>
        <div className={styles.title}>
          기분좋고 행복한 <br />
          서또카늘님에게 딱맞는 칵테일을 찾았어요!
        </div>
        <div className={styles.a}>대충 칵테일 사진</div>
        <div className={styles.a}>칵테일이름과 비슷한 칵테일</div>
        <div className={styles.a}>대충 맵</div>
      </div>
    </ContainerMain>
  );
}

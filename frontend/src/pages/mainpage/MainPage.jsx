import Container from "../../components/common/Container";
import styles from "./MainPage.module.css";
import Nav from "../../components/common/Nav";
import 배경바 from "../../assets/bartender/임시바배경.png";
import React from "react";
import { useState } from "react";
import Cattalkbox from "../../components/main/Cattalkbox";
import { talkarr } from "./Talkdata/Talkarr";

export default function MainPage() {
  const [talknum, setTalknum] = useState(1);
  // cattalk에서 0은 없는거 1은 다음버튼있는거 2는 다음버튼없는거 3은 고르시오
  // usertakl에서 0은 없는거 1은 대화 2,3,4,5,6,7은 특정고르기
  return (
    <Container>
      <div className={styles.main}>
        <div className={styles.임시바}>
          <img className={styles.배경바} src={배경바} alt="" />
        </div>
        <Cattalkbox
          talknum={talknum}
          setTalknum={setTalknum}
          talkarr={talkarr[talknum]}
        />
      </div>
      <Nav num={3} />
    </Container>
  );
}

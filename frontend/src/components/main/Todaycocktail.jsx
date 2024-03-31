import styles from "./Userselctbox.module.css";
import React from "react";

export default function Todaycocktail({ talknum, setTalknum }) {
  const clickevent = (talk) => {
    setTalknum(talknum + 1);
  };

  return (
    <div className={styles.선택창}>
      <div>블렌딩하기</div>
    </div>
  );
}

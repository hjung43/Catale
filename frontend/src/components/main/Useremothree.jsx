import s from "classnames";
import styles from "./Usertalkbox.module.css";
import 유저말풍선 from "../../assets/bartender/유저말풍선.png";
import { Usertalk } from "../../pages/mainpage/Talkdata/Usertalk";
import React from "react";

export default function Useremothree({ talknum, setTalknum }) {
  return (
    <>
      <div className={styles.유저말풍선}>
        <img className={styles.말풍선} src={유저말풍선} alt="" />
        <div className={styles.유저이름}>고먐미</div>
        <div className={styles.유저내용}>{Usertalk[talknum].talk}</div>
        <div
          className={styles.고양이다음}
          onClick={() => setTalknum(talknum + 1)}
        >
          click !
        </div>
      </div>
    </>
  );
}

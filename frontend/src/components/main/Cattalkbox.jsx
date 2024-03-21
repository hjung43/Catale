import s from "classnames";
import styles from "./Cattalkbox.module.css";
import 고양이말풍선 from "../../assets/bartender/고양이말풍선.png";
import 파란말풍선 from "../../assets/bartender/파란말풍선.png";
import { cattalk } from "../../pages/mainpage/Talkdata/Cattalk";
import React from "react";

export default function Cattalkbox({ talknum, setTalknum, talkarr }) {
  console.log(talkarr);
  return (
    <>
      <div className={styles.고양이말풍선}>
        <img className={styles.말풍선} src={고양이말풍선} alt="" />
        <div className={styles.고양이이름}>고먐미</div>
        <div className={styles.고양이내용}>
          {cattalk[talkarr.cattalk].talk.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
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

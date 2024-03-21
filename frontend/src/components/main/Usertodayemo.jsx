import s from "classnames";
import styles from "./Usertodayemo.module.css";

import React from "react";
import emo1 from "../../assets/bartender/emo1.png";
import emo2 from "../../assets/bartender/emo2.png";
import emo3 from "../../assets/bartender/emo3.png";
import emo4 from "../../assets/bartender/emo4.png";
import emo5 from "../../assets/bartender/emo5.png";

export default function Usertodayemo({
  talknum,
  setTalknum,
  setNowemonum,
  말풍선,
}) {
  const emotion = [emo1, emo2, emo3, emo4, emo5];

  const clickevent = (index) => {
    setNowemonum(index);
    setTalknum(talknum + 1);
  };
  return (
    <>
      <div className={styles.기분박스}>
        <div>오늘 나의 기분은 ?</div>
        <div className={styles.유저말풍선}>
          {/* <img className={styles.말풍선} src={말풍선} alt="" /> */}
          <div className={styles.유저내용}>
            {emotion.map((emo, index) => (
              <>
                <img onClick={() => clickevent(index)} src={emo} alt="" />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

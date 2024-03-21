import s from "classnames";
import styles from "./Userselctbox.module.css";
import React from "react";
import { selelctalk } from "../../pages/mainpage/Talkdata/Selecttalk";

export default function Userselctbox({
  talknum,
  setTalknum,
  talkarr,
  setSeletnum,
}) {
  const nowselecttalk = selelctalk[talkarr.select];
  console.log(nowselecttalk);
  console.log(talkarr.user);

  const clickevent = (talk) => {
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };
  return (
    <>
      <div className={styles.선택창}>
        <div>{nowselecttalk[0].talk}</div>
        {nowselecttalk.map((talk) => (
          <>
            {talk.num != -1 && (
              <div className={styles.선택} onClick={() => clickevent(talk)}>
                <div>{talk.talk}</div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
}

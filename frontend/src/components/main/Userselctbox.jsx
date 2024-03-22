import styles from "./Userselctbox.module.css";
import React from "react";
import { selelctalk } from "../../pages/mainpage/Talkdata/Selecttalk";

export default function Userselctbox({
  talknum,
  setTalknum,
  talkarr,
  setSeletnum,
  //밑에는 11번째에서 쓰는거
  setTodayemo,
  setSelectcheck,
}) {
  const nowselecttalk = selelctalk[talkarr.select];
  // console.log(nowselecttalk);
  // console.log(talkarr.user);

  //이거는 2번전용으로 한거였어 왜냐면 뭘 누르던 일단 다음 대화로가니깐
  const clickevent = (talk) => {
    setTalknum(talknum + 1);
    setSeletnum(talk.num);
  };

  //내가 만들거는 11번 전용 알고리즘 이건 맞아! 눌렀을때임
  const clickevent11_1 = (talk) => {
    setSelectcheck(false);
    setTalknum(talk.num);
  };
  const clickevent11_2 = (talk) => {
    setSelectcheck(false);
    setTodayemo([]);
    setTalknum(talk.num);
  };
  return (
    <>
      <div className={styles.선택창}>
        <div>{nowselecttalk[0].talk}</div>
        {talknum !== 11 && (
          <>
            {nowselecttalk.map((talk) => (
              <>
                {talk.num !== -1 && (
                  <div className={styles.선택} onClick={() => clickevent(talk)}>
                    <div>{talk.talk}</div>
                  </div>
                )}
              </>
            ))}
          </>
        )}
        {talknum === 11 && (
          <>
            <div
              className={styles.선택}
              onClick={() => clickevent11_1(nowselecttalk[1])}
            >
              <div>{nowselecttalk[1].talk}</div>
            </div>
            <div
              className={styles.선택}
              onClick={() => clickevent11_2(nowselecttalk[2])}
            >
              <div>{nowselecttalk[2].talk}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

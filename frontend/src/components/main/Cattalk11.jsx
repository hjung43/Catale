import styles from "./Cattalkbox.module.css";
import React, { useEffect, useState } from "react";
import { mood1, mood2 } from "../../pages/mainpage/Emodata/Emotionthree";
import { selectcolor } from "../../pages/mainpage/Emodata/Emocolor";

export default function Cattalk11({ talkarr, 말풍선, todayemo }) {
  //그리고 새로운 객체를 만들어야해 갯수만큼있고 배열로 되어있고 [{글자,글자색}] 이거를 만들어
  //11번은 들어오자마자 mood에서 글자뽑아내고 글자에 색입혀서 보여줘야해
  //emo의 갯수만큼 일단 숫자를 만들어야하는데 1개만 선택, 2개선택, 3개선택을 유동적으로
  //생각하고 해야해 일단 길이를 확인해 ㅇㅋ
  //이게 이제 1일때 2일때 3일때를 나눠야해
  const [talkObjects, setTalkObjects] = useState([]);

  useEffect(() => {
    if (todayemo.length === 1) {
      const moodIndex = Math.floor(todayemo[0] / 10); // 십의 자리수 구하기
      const talkObj = {
        talk: mood1[moodIndex][todayemo[0] % 10],
        color: selectcolor[moodIndex],
      };
      setTalkObjects([talkObj]);
    } else if (todayemo.length === 2) {
      const newTalkObjects = todayemo.map((emo, index) => {
        const moodIndex = Math.floor(emo / 10); // 십의 자리수 구하기
        const talk =
          index === todayemo.length - 1
            ? mood1[moodIndex][emo % 10]
            : mood2[moodIndex][emo % 10];
        const color = selectcolor[moodIndex];
        return { talk, color };
      });
      setTalkObjects(newTalkObjects);
    } else if (todayemo.length === 3) {
      const newTalkObjects = todayemo.map((emo, index) => {
        const moodIndex = Math.floor(emo / 10); // 십의 자리수 구하기
        const talk =
          index === todayemo.length - 1
            ? mood1[moodIndex][emo % 10]
            : mood2[moodIndex][emo % 10];
        const color = selectcolor[moodIndex];
        return { talk, color };
      });
      setTalkObjects(newTalkObjects);
    }
  }, [todayemo]);
  return (
    <>
      <div className={styles.고양이말풍선}>
        {talkarr.cat !== 3 ? (
          <img className={styles.말풍선} src={말풍선} alt="" />
        ) : (
          <>
            <div className={styles.만들자말풍선} />
          </>
        )}

        {talkarr.cat !== 3 && (
          <>
            <div className={styles.고양이이름}>고먐미</div>
            <div className={styles.고양이내용11}>
              <>
                <div>오늘은</div>
                <div className={styles.감정대화}>
                  {talkObjects.map((talkObj) => (
                    <div style={{ color: talkObj.color }}>{talkObj.talk}</div>
                  ))}
                </div>
                <div>하루였구냥!</div>
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
}

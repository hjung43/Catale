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

  const [currentText, setCurrentText] = useState("");
  const [currentText2, setCurrentText2] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const newTalkObjects = todayemo.map((emo, index) => {
      const moodIndex = Math.floor(emo / 10);
      const talk =
        index === todayemo.length - 1
          ? mood1[moodIndex][emo % 10]
          : mood2[moodIndex][emo % 10];
      const color = selectcolor[moodIndex];
      return { talk, color };
    });
    setTalkObjects(newTalkObjects);
    showText(" 오늘은");
  }, [todayemo]);

  const showText = (text) => {
    let charIndex = 0;
    const id = setInterval(() => {
      setCurrentText((prevText) => prevText + text[charIndex]);
      charIndex++;
      if (charIndex === text.length - 1) {
        clearInterval(id);
        showEndText(" 하루였구냥!");
      }
    }, 60);
    setIntervalId(id);
  };

  const showEndText = (text) => {
    let charIndex = 0;
    const id = setInterval(() => {
      setCurrentText2((prevText) => prevText + text[charIndex]);
      charIndex++;
      if (charIndex === text.length - 1) {
        clearInterval(id);
      }
    }, 60);
    setIntervalId(id);
  };

  return (
    <>
      <div className={styles.고양이말풍선}>
        <img className={styles.말풍선} src={말풍선} alt="" />
        <div className={styles.고양이이름}>고먐미</div>
        <div className={styles.고양이내용11}>
          <>
            <div>{currentText}</div>
            <div className={styles.감정대화}>
              {talkObjects.map((talkObj) => (
                <div style={{ color: talkObj.color }}>{talkObj.talk}</div>
              ))}
            </div>
            <div>{currentText2}!</div>
          </>
        </div>
      </div>
    </>
  );
}

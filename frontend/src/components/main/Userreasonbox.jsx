import styles from "./Userreasonbox.module.css";
import React, { useState, useEffect } from "react";
import { reasonone } from "../../pages/mainpage/Emodata/Reasonone";

export default function Userreasonbox({
  todayreason,
  setTodayreason,
  setSelectcheck,
}) {
  const backcolor = ["#EDF1FF"];
  const fontcolor = ["#1D1D1D"];
  const selectcolor = ["#708FFE"];

  const [clickedIndexes, setClickedIndexes] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [customReason, setCustomReason] = useState(""); // 사용자가 입력한 기분을 저장할 상태 추가

  const removeValue = () => {
    setTodayreason("");
    setClickedIndexes([]);
    setSelectcheck(false);
  };

  const clickevent = (string, index) => {
    setCustomReason("");
    if (todayreason === string) {
      removeValue(); // 이미 존재하는 값이라면 제거
    } else if (clickedIndexes.length < 1) {
      setTodayreason(string);
      setClickedIndexes([index]);
      setSelectcheck(true);
    } else {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000); // 2초 후에 토스트를 숨김
    }
  };

  // const checkLength = () => {
  //   if (todayreason === "") {
  //     // 사용자가 직접 입력한 기분도 확인
  //     setSelectcheck(false);
  //   } else {
  //     setSelectcheck(true);
  //   }
  // };

  // useEffect(() => {
  //   checkLength();
  // }, [todayreason]); // 사용자가 직접 입력한 기분도 감시

  useEffect(() => {
    if (customReason != "") {
      setClickedIndexes([]);
      setSelectcheck(true);
    } else {
      setSelectcheck(false);
    }
  }, [customReason]); // 사용자가 직접 입력한 기분도 감시

  const handleCustomReasonChange = (e) => {
    setCustomReason(e.target.value); // 사용자가 입력한 기분 업데이트
    setTodayreason(e.target.value);
  };

  const check = () => {
    console.log(todayreason);
  };

  return (
    <>
      <div className={styles.감정선택칸}>
        <>
          {reasonone.map((mod, index) => (
            <div
              className={`${styles.상자하나} ${
                clickedIndexes.includes(index) ? styles.selected : ""
              }`}
              key={index}
              onClick={() => clickevent(mod, index)}
              style={{
                backgroundColor: clickedIndexes.includes(index)
                  ? selectcolor
                  : backcolor,
              }}
            >
              {mod}
            </div>
          ))}
        </>
        {/* 텍스트 입력 필드 */}
        <input
          type="text"
          placeholder="직접 입력"
          value={customReason}
          onChange={handleCustomReasonChange}
          style={{ color: "black" }}
        />
        {/* 직접 입력한 기분 추가 버튼 */}
        <button onClick={check}>추가</button>
      </div>
      {toastVisible && (
        <div className={styles.toast}>
          최대 1개의 기분을 선택할 수 있습니다.
        </div>
      )}
    </>
  );
}

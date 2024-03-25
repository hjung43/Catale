import styles from "./Usercomment.module.css";
import React, { useState } from "react";

export default function Usercomment({ todaycomment, setTodaycomment }) {
  // const [writecomment , setWritecomment] = useState("");
  const [check, setCheck] = useState(false);

  const handleCustomReasonChange = (e) => {
    setTodaycomment(e.target.value);
  };

  const checkcomment = () => {
    console.log(todaycomment);
  };
  return (
    <>
      <div className={styles.유저말풍선}>
        <div>{todaycomment}</div>
        <div>
          <input
            type="text"
            placeholder="직접 입력"
            value={todaycomment}
            onChange={handleCustomReasonChange}
            className={styles.인풋창}
            style={{ color: "black" }}
          />
          {/* 직접 입력한 기분 추가 버튼 */}
        </div>
        <button onClick={checkcomment}>확인</button>
      </div>
    </>
  );
}

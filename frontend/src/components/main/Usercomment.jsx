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
        <textarea
          placeholder="오늘 하루에 대한 코멘트"
          value={todaycomment}
          onChange={handleCustomReasonChange}
          className={styles.인풋창}
          style={{ color: "black" }}
        />
        {/* <button onClick={checkcomment}>확인</button> */}
      </div>
    </>
  );
}

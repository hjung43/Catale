import Container from "../components/common/Container";
import styles from "./PreferencePage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { preference, check } from "../api/Member";
import { alctalk, opttalk } from "../components/data/searchtalk";

export default function PreferencePage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState(user);

  const navigate = useNavigate();

  const handleSliderChange = (e, fieldName) => {
    const value = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const sendDataToServer = async () => {
    console.log(formData);
    try {
      const response = await preference(formData);
      console.log(response);
      if (response.status === "SUCCESS") {
        console.log("취향변경이 완료되었습니다.");
        setUser(formData);
        navigate("../choosecocktail");
      } else {
        console.log("에러 발생");
      }
    } catch (error) {
      console.error("수정 에러:", error);
    }
  };
  const list = ["sweet", "bitter", "sour", "alc", "sparking"];
  const optlist = ["당도", "쓴맛", "신맛", "도수", "탄산"];

  return (
    <Container>
      <div className={styles.main}>
        <div className={styles.폰트들}>
          <div className={styles.폰트}>당신의 즐겨마시는</div>
          <div className={styles.폰트}>술 취향을 선택해주세요 !</div>
        </div>
        <div className={styles.선택창들}>
          {list.map((key, index) => (
            <div key={key} className={styles.selectbox}>
              {index !== 3 && (
                <p className={styles.옵션}>
                  {optlist[index]} : {opttalk[formData[key]]}
                </p>
              )}
              {index === 3 && (
                <p className={styles.옵션}>
                  {optlist[index]} : {alctalk[formData[key]]}
                </p>
              )}
              <input
                type="range"
                min="0"
                max="5"
                value={formData[key]}
                onChange={(e) => handleSliderChange(e, key)}
                className={styles.rangeInput}
              />
            </div>
          ))}
        </div>
        <button className={styles.검색하기} onClick={() => sendDataToServer()}>
          선택완료
        </button>
      </div>
    </Container>
  );
}

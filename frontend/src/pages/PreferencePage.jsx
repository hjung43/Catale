import Container from "../components/common/Container";
import styles from "./PreferencePage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { preference, check } from "../api/Member";

export default function PreferencePage() {
  const [formData, setFormData] = useState({
    alc: useUserStore((state) => state.user.alc),
    sweet: useUserStore((state) => state.user.sweet),
    sour: useUserStore((state) => state.user.sour),
    bitter: useUserStore((state) => state.user.bitter),
    sparking: useUserStore((state) => state.user.sparking),
  });

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
        navigate("../my");
      } else {
        console.log("에러 발생");
      }
    } catch (error) {
      console.error("수정 에러:", error);
    }
  };

  return (
    <Container>
      <div className={styles.main}>
        {Object.keys(formData).map((key) => (
          <div key={key} className={styles.selectbox}>
            <p>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {formData[key]}
            </p>
            <input
              type="range"
              min="0"
              max="5"
              value={formData[key]}
              onChange={(e) => handleSliderChange(e, key)}
            />
          </div>
        ))}
        <button className={styles.button} onClick={() => sendDataToServer()}>
          완료
        </button>
      </div>
    </Container>
  );
}

import Container from "../components/common/Container";
import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import s from "classnames";
import { signup, checkEmail, checkNickName } from "../api/member/Singup";
import toast from "react-hot-toast";
export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const navigate = useNavigate();

  /* 값을 입력함과 동시에 form 데이터 동시에 갱신 */
  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }
  /* 닉네임은 입력하면 닉네임 중복 처리가 초기화되므로 따로 처리 */
  const handleNickNameChange = (e) => {
    // setIsNickNameChecked(false);
    handleChange(e);
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    try {
      const data = await signup(formData);
      console.log(data);

      if (data.status === "SUCCESS") {
        showToast("회원가입 성공!");
        console.log("회원가입이 완료되었습니다.");
        setFormData({
          email: "",
          password: "",
          passwordConfirm: "",
          nickname: "",
        });
        navigate(`../`);
      } else {
        console.log("에러임");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };
  /* 알림 함수 */
  const showToast = (string) => {
    toast.error(`${string}`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
        zIndex: "100",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
      position: "top-center",
    });
  };
  return (
    <Container>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>email</label>
            <input
              className={s(
                styles.input,
                formErrors.email && styles.shakeAnimation
              )}
              type="email"
              name="email"
              value={formData.email}
              placeholder="이메일을 입력해주세요"
              onChange={handleChange}
            />
            {formErrors.email && (
              <div className={styles.error}>{formErrors.email}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>비밀번호</label>
            <input
              className={s(
                styles.input,
                formErrors.password && styles.shakeAnimation
              )}
              type="password"
              name="password"
              color="black"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <div className={styles.error}>{formErrors.password}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>비밀번호 확인</label>
            <input
              className={s(
                styles.input,
                formErrors.passwordConfirm && styles.shakeAnimation
              )}
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
            {formErrors.passwordConfirm && (
              <div className={styles.error}>{formErrors.passwordConfirm}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>닉네임</label>
            <input
              className={s(
                styles.input,
                formErrors.nickname && styles.shakeAnimation
              )}
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleNickNameChange}
            />
            {formErrors.nickname && (
              <div className={styles.error}>{formErrors.nickname}</div>
            )}
          </div>
          <div className={styles.button} onClick={() => handleSubmit()}>
            회원가입
          </div>
        </form>
      </div>
    </Container>
  );
}

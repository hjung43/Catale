import { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import { login } from "../api/Member";
import { todaydiary } from "../api/Diary";
import useUserStore from "../store/useUserStore";
import useTodayStore from "../store/useTodayStore";
import styles from "./SignInPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import Container from "../components/common/Container";
export default function SignInPage() {
  /* 오류페이지 이동 */
  const navigate = useNavigate();

  // 유저상태 전역 관리를 위한 코드
  const { user, setUser } = useUserStore();
  const setToday = useTodayStore((state) => state.setToday);

  /* 상태 */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* 메서드 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value.length > 50) {
      return;
    }
    if (name === "password" && value.length > 20) {
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const res = await login(formData);
      if (res.status === "SUCCESS") {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("tokenTimestamp", Date.now());
        await setUser({
          memberId: res.data.memberInfo.memberId,
          email: res.data.memberInfo.email,
          nickname: res.data.memberInfo.nickname,
          profileImageUrl: res.data.memberInfo.profileImageUrl,
          profileImageId: res.data.memberInfo.profileImageId,
          alc: res.data.memberInfo.alc,
          sweet: res.data.memberInfo.sweet,
          sour: res.data.memberInfo.sour,
          bitter: res.data.memberInfo.bitter,
          sparking: res.data.memberInfo.sparking,
          social: res.data.memberInfo.social,
          check: res.data.check,
        });
        if (res.data.memberInfo.alc == -1) navigate(`../preference`);
        else {
          const isToday = await todaydiary();
          await setToday({ today: isToday.data });
          toast.success(`로그인 성공 !`, {
            position: "top-center",
          });
          navigate(`../bar`);
        }
      } else {
        // 이메일, 비밀번호 불일치
        toast.error(`이메일 혹은 비밀번호가 틀렸습니다`, {
          position: "top-center",
        });
      }
    } catch (error) {
      // 전송 오류 발생 시
      // 서버에러. 에러페이지로 이동
      console.error("로그인 에러:", error);
    }
  };

  // /* 알림 함수 */
  // const showToast = (string) => {
  //   toast.error(`${string}`, {
  //     style: {
  //       border: "1px solid #713200",
  //       padding: "16px",
  //       color: "#713200",
  //       zIndex: "100",
  //     },
  //     iconTheme: {
  //       primary: "#713200",
  //       secondary: "#FFFAEE",
  //     },
  //     position: "top-center",
  //   });
  // };

  return (
    <Container>
      <Toaster position="top-center" />
      <div className={styles.main}>
        <div className={styles.폰트}>
          <div>이야기와 칵테일이 공존하는 공간</div>
          <div>CATale 에 오신것을 환영합니다</div>
        </div>
        <form>
          <div className={styles.inputContainer}>
            <label className={styles.label}>email</label>
            <input
              className={styles.input}
              type="text"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>비밀번호</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.button} onClick={() => handleSubmit()}>
            로그인
          </div>
          <div
            className={styles.회원가입하러가기}
            onClick={() => navigate(`/signup`)}
          >
            아직 회원이 아니신가요?
          </div>
        </form>
      </div>
    </Container>
  );
}

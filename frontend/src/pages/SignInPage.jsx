import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Member";
import useUserStore from "../store/useUserStore";
import styles from "./SignInPage.module.css";
import toast from "react-hot-toast";
import Container from "../components/common/Container";
export default function SignInPage() {
  /* 오류페이지 이동 */
  const navigate = useNavigate();

  // 유저상태 전역 관리를 위한 코드
  const { user, setUser } = useUserStore();

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
        // useStore에 data안에 들어있는 기본 정보들을 저장해라
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("tokenTimestamp", Date.now());
        // console.log(res.data);
        //  localStorage.setItem("tokenTimestamp", Date.now());
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
          showToast("로그인성공!");
          navigate(`../bar`);
        }
      } else {
        // 이메일, 비밀번호 불일치
        console.log("에러남");
        showToast("아이디와 비밀번호를 확인해주세요.");
      }
    } catch (e) {
      // 전송 오류 발생 시
      // 서버에러. 에러페이지로 이동
      console.log("에러남222");
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
        </form>
      </div>
    </Container>
  );
}

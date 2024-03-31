import React, { useEffect } from "react";
import Container from "../components/common/Container";
import styles from "./WelcomePage.module.css";
import 웰컴 from "../assets/common/웰컴.png";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // 로컬 스토리지에 accesstoken이 있으면 /bar 페이지로 이동
      navigate("/bar");
    }
  }, [navigate]);

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.로고}>
          <img className={styles.웰컴} src={웰컴} alt="" />
        </div>
        <div className={styles.웰컴하단}>
          <div className={styles.로그인} onClick={() => navigate("login")}>
            로그인
          </div>
          <div className={styles.회원가입} onClick={() => navigate("signup")}>
            회원가입
          </div>
          <div className={styles.또는}>또는</div>
          <div>
            <span className={styles.카카오톡}>카카오톡</span>
            <span className={styles.시작하기}> 으로 시작하기</span>
          </div>
        </div>
        <div className={styles.버전}>version-0.99</div>
      </div>
    </Container>
  );
}

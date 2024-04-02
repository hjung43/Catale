import Container from "../components/common/Container";
import styles from "./GuidePage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 검색1 from "../assets/guide/검색1.png";
import 검색2 from "../assets/guide/검색2.png";
import 달력1 from "../assets/guide/달력1.png";
import 마이1 from "../assets/guide/마이1.png";
import 메인0 from "../assets/guide/메인0.png";
import 메인1 from "../assets/guide/메인1.png";
import 메인2 from "../assets/guide/메인2.png";
// import 지도1 from "../assets/guide/지도1.png";

export default function GuidePage() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setList([마이1, 검색1, 검색2, 메인0, 메인1, 메인2, 달력1]);
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === list.length - 1) {
        return 0; // 처음 이미지로 돌아가기
      } else {
        return prevPage + 1; // 다음 이미지로 이동
      }
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === 0) {
        return list.length - 1; // 마지막 이미지로 이동
      } else {
        return prevPage - 1; // 이전 이미지로 이동
      }
    });
  };

  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.사용법}>캣테일 사용법</div>
        <img className={styles.가이드북} src={list[currentPage]} alt="" />
        <div className={styles.박스}>
          <div onClick={handlePrevPage}>이전</div>
          <span>
            {currentPage + 1} / {list.length}
          </span>
          <div onClick={handleNextPage}>다음</div>
        </div>
        {currentPage === list.length - 1 && (
          <div className={styles.고양이대화} onClick={() => navigate(`/bar`)}>
            고양이랑 대화하러가기
          </div>
        )}
      </div>
    </Container>
  );
}

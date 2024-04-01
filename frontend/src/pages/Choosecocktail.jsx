import Container from "../components/common/Container";
import styles from "./Choosecocktail.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { chooselist } from "../api/Member";
import { getcocktaillist } from "../api/Cocktail";
import CocktailBox3 from "../components/main/CocktailBox3";

export default function Choosecocktail() {
  const [formData, setFormData] = useState([]);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(18);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchlistData() {
      const option = { page: currentPage - 1, size: pageSize };
      try {
        const response = await getcocktaillist(option);
        setList(response.data);
        // 페이지 로딩 후 스크롤을 페이지 상단으로 이동
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlistData();
  }, [currentPage, pageSize]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const sendDataToServer = async () => {
    console.log(formData);
    try {
      // 클라이언트에서 전송하는 데이터를 서버에서 원하는 형식으로 변환하여 전달
      const cocktailIds = formData;
      const response = await chooselist({ cocktailIds });
      console.log(response);
      if (response.status === "SUCCESS") {
        console.log("추가완료.");
        // 페이지 이동 후 스크롤을 페이지 상단으로 이동
        navigate("../guidePage");
      } else {
        console.log("에러 발생");
      }
    } catch (error) {
      console.error("수정 에러:", error);
    }
  };

  return (
    <Container>
      <div className={styles.좋칵}>좋아하는 칵테일을 클릭해주세요 !</div>
      <div className={styles.flex}>
        <div
          className={styles.선택박스}
          onClick={() => {
            console.log(formData);
            sendDataToServer();
          }}
        >
          {formData.length} 개 선택하기
        </div>
      </div>
      {list && (
        <>
          <div className={styles.칵테일전체박스}>
            {list.map((data) => (
              <div className={styles.칵테일들}>
                <CocktailBox3
                  cocktail={data}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {currentPage !== 1 && (
              <div onClick={handlePrevPage} disabled={currentPage === 1}>
                이전 페이지
              </div>
            )}
            {currentPage === 1 && (
              <div className={styles.끝페이지}>이전 페이지</div>
            )}
            <span>{currentPage} / 13</span>
            {currentPage !== 13 && (
              <div onClick={handleNextPage}>다음 페이지</div>
            )}
            {currentPage === 13 && (
              <div className={styles.끝페이지}>다음 페이지</div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

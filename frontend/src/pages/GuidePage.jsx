import Container from "../components/common/Container";
import styles from "./GuidePage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getcocktaillist } from "../api/Cocktail";

export default function GuidePage() {
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

  return (
    <Container>
      <div className={styles.flex}>
        가이드페이지 대충 사진 6장 정도넣고 설명해주는거 화살표로 이동하게
        한다음 마지막 화살표에 도착하면 고양이대화하러가기가 나와서 메인페이지로
        이동하게함
        <div className={styles.고양이대화} onClick={() => navigate(`/bar`)}>
          고양이랑 대화하러가기
        </div>
      </div>
    </Container>
  );
}

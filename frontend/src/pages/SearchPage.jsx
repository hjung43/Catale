import Container from "../components/common/Container";
import styles from "./SearchPage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import Box from "../components/common/Box";
import { getcocktaillist, cocktailsearchname } from "../api/Cocktail";
import { useState } from "react";

export default function SearchPage() {
  const [formData, setFormData] = useState({
    page: 0,
    size: 100,
  });

  const sendDataToServer = async () => {
    console.log(formData);
    try {
      const response = await cocktailsearchname(formData.page, formData.size);
      console.log(response);
      if (response.status === "SUCCESS") {
        console.log("취향변경이 완료되었습니다.");
      } else {
        console.log("에러 발생");
      }
    } catch (error) {
      console.error("수정 에러:", error);
    }
  };

  return (
    <Container>
      {/* <Header>검색</Header> */}
      <div className={styles.main}>
        <button className={styles.button} onClick={() => sendDataToServer()}>
          조회
        </button>
        <button className={styles.button} onClick={() => sendDataToServer()}>
          조회
        </button>
      </div>
      <Nav num={1} />
    </Container>
  );
}

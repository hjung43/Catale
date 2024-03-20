import Container from "../../components/common/Container";
import styles from "./DiaryPage.module.css";
import Nav from "../../components/common/Nav";
import Header from "../../components/common/Header";
import Box from "../../components/common/Box";
import { useParams } from "react-router-dom";

export default function DiaryPage() {
  const Params = useParams();
  return (
    <Container>
      <Header>
        <div className={styles.title}>
          {Params.year}년 {Params.month}월
        </div>
      </Header>
      <div className={styles.main}>
        {/* <Box>
          <div className={styles.chart}>
            <canvas ref={chartRef} />
          </div>
        </Box> */}
      </div>
      <Nav num={4} />
    </Container>
  );
}

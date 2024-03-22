import Container from "../components/common/Container";
import styles from "./SearchPage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import Box from "../components/common/Box";

export default function SearchPage() {
  return (
    <Container>
      <Header>검색</Header>
      <div className={styles.main}>
        {/* <Box>
          <div className={styles.chart}>
            <canvas ref={chartRef} />
          </div>
        </Box> */}
      </div>
      <Nav num={1} />
    </Container>
  );
}

import Container from "../../components/common/Container";
import styles from "./MainPage.module.css";
import Nav from "../../components/common/Nav";
import Box from "../../components/common/Box";

export default function MainPage() {
  return (
    <Container>
      <div className={styles.main}>
        {/* <Box>
          <div className={styles.chart}>
            <canvas ref={chartRef} />
          </div>
        </Box> */}
      </div>
      <Nav num={3} />
    </Container>
  );
}

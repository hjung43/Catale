import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./MyCocktailPage.module.css";
import arrow from "../../assets/common/arrow5.png";

export default function MyCocktailPage() {
  return (
    <Container>
      <Headerwb title={"내가 마신 칵테일"} />
      <div className={styles.main}>
        <div className={styles.order}>
          <div>
            <div>날짜순</div>
            <img src={arrow} alt="arrow" />
          </div>
          <div>
            <div>평점순</div>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
    </Container>
  );
}

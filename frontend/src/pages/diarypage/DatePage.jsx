import { useParams } from "react-router";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./DatePage.module.css";

export default function DatePage() {
  const { diaryId } = useParams();

  return (
    <Container>
      <Headerwb title={`칵테일 ${diaryId}`} />

      <div className={styles.background}>
        <div className={styles.cover}></div>
      </div>
    </Container>
  );
}

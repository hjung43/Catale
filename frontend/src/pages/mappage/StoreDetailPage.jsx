import Container from "../../components/common/Container";
import styles from "./StoreDetailPage.module.css";
import Header from "../../components/common/Header";
import Map from "../../components/map/map";
import StoreInfo from "../../components/map/StoreInfo";
import { useParams, useNavigate } from "react-router-dom";

export default function StoreDetailPage() {
  const { storenumber } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header>
          <div className={styles.head}>
            <div onClick={() => navigate(-1)} className={styles.특수기호}>
              &lt;
            </div>
            <div>{storenumber}</div>
          </div>
        </Header>
        <Map />
        <StoreInfo />
      </Container>
    </>
  );
}

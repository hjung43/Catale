import Container from "../../components/common/Container";
import styles from "./StoreDetailPage.module.css";
import Header from "../../components/common/Header";
import Map from "../../components/map/map";
import StoreInfo from "../../components/map/StoreInfo";
import { useParams, useNavigate } from "react-router-dom";
import { markerdataB, markerdataG } from "../../components/map/data/markerData";

export default function StoreDetailPage() {
  const { storenumber } = useParams();
  // 봉명동과 궁동의 데이터를 병합합니다.
  const allData = [...markerdataB, ...markerdataG];

  // storenumber에 해당하는 칵테일바 데이터를 찾습니다.
  const selectedStore = allData.find(
    (store) => store.number === parseInt(storenumber)
  );

  const nowlocatex = selectedStore.lat;
  const nowlocatey = selectedStore.lng;

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
        <Map nowlocatex={nowlocatex} nowlocatey={nowlocatey} level="2" />
        <StoreInfo selectedStore={selectedStore} />
      </Container>
    </>
  );
}

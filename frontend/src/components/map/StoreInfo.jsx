import Container from "../common/Container";
import styles from "./StoreInfo.module.css";
import { useParams } from "react-router-dom";
import { markerdataB, markerdataG } from "./data/markerData";
import Storepicture from "./Storepicture";
import Storemenu from "./Storemenu";
import IconTel from "../../assets/icon/IconTel.png";
import IconTime from "../../assets/icon/IconTime.png";
import IconInsta from "../../assets/icon/IconInsta.png";
import IconMap from "../../assets/icon/IconMap.png";

export default function StoreDetailPage() {
  const { storenumber } = useParams();

  // 봉명동과 궁동의 데이터를 병합합니다.
  const allData = [...markerdataB, ...markerdataG];

  // storenumber에 해당하는 칵테일바 데이터를 찾습니다.
  const selectedStore = allData.find(
    (store) => store.number === parseInt(storenumber)
  );

  // 선택된 칵테일바 데이터를 이용하여 원하는 작업을 수행합니다.
  console.log(selectedStore);

  return (
    <>
      <Container>
        <div className={styles.storeInfo}>
          <div className={styles.topInfo}>
            {selectedStore.영업시간 && (
              <div>
                <img src={IconTime} alt="" />
                {selectedStore.영업시간}
              </div>
            )}
            {selectedStore.정기휴무 && (
              <div>정기휴무 : {selectedStore.정기휴무}</div>
            )}
            {selectedStore.주소 && (
              <div>
                <img src={IconMap} alt="" />
                {selectedStore.주소}
              </div>
            )}
            {selectedStore.tel && (
              <div>
                <img src={IconTel} alt="" />
                {selectedStore.tel}
              </div>
            )}
            {selectedStore.insta && (
              <div>
                <img src={IconInsta} alt="" />
                <a href={selectedStore.insta}>{selectedStore.insta}</a>
              </div>
            )}
          </div>
          <div className={styles.중간디브} />
          <Storepicture storenumber={storenumber} />
          <Storemenu storenumber={storenumber} />
        </div>
      </Container>
    </>
  );
}

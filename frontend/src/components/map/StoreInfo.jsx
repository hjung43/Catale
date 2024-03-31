import Container from "../common/Container";
import styles from "./StoreInfo.module.css";
import IconTel from "../../assets/icon/IconTel.png";
import IconTime from "../../assets/icon/IconTime.png";
import IconInsta from "../../assets/icon/IconInsta.png";
import IconMap from "../../assets/icon/IconMap.png";

export default function StoreInfo(selectedStore) {
  // 봉명동과 궁동의 데이터를 병합합니다.
  // 선택된 칵테일바 데이터를 이용하여 원하는 작업을 수행합니다.
  return (
    <>
      <div className={styles.storeInfo}>
        <div className={styles.topInfo}>
          {selectedStore.selectedStore.영업시간 && (
            <div>
              <img src={IconTime} alt="" />
              {selectedStore.selectedStore.영업시간}
            </div>
          )}
          {selectedStore.selectedStore.정기휴무 && (
            <div>정기휴무 : {selectedStore.selectedStore.정기휴무}</div>
          )}
          {selectedStore.selectedStore.주소 && (
            <div>
              <img src={IconMap} alt="" />
              {selectedStore.selectedStore.주소}
            </div>
          )}
          {selectedStore.selectedStore.tel && (
            <div>
              <img src={IconTel} alt="" />
              {selectedStore.selectedStore.tel}
            </div>
          )}
          {selectedStore.selectedStore.insta && (
            <div>
              <img src={IconInsta} alt="" />
              <a href={selectedStore.selectedStore.insta}>instagram</a>
            </div>
          )}
        </div>
        <div className={styles.중간디브} />
      </div>
    </>
  );
}

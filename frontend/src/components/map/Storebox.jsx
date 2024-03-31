import s from "classnames";
import styles from "./Storebos.module.css";
import Box from "../common/Box";
import { useNavigate } from "react-router-dom";

function Storebox({ store, nowclick }) {
  const navigate = useNavigate();
  return (
    <div
      className={s(styles.store)}
      onClick={() => navigate(`detail/${store.number}`)}
    >
      <Box color={nowclick === store.number && true}>
        <div className={styles.박스하나}>
          <div
            className={styles.가게사진}
            style={{
              backgroundImage: `url(${store.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className={styles.가게상세들}>
            <div className={styles.가게이름}>{store.title}</div>
            <div className={styles.가게주소}>{store.주소}</div>
            <div className={styles.가게영업시간}>
              영업시간 : {store.영업시간}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Storebox;

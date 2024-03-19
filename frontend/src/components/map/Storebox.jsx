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
        <div>{store.title}</div>
        <div>{store.주소}</div>
        <div>영업시간 : {store.영업시간}</div>
      </Box>
    </div>
  );
}

export default Storebox;

import s from "classnames";
import styles from "./Storebos.module.css";
import Box from "../common/Box";
function Storebox({ store }) {
  return (
    <div className={s(styles.store)}>
      <Box>
        <div>{store.title}</div>
        <div>{store.주소}</div>
        <div>영업시간 : {store.영업시간}</div>
      </Box>
    </div>
  );
}

export default Storebox;

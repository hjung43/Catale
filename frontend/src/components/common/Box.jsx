import s from "classnames";
import styles from "./Box.module.css";
function Box({ children }) {
  return <div className={s(styles.box)}>{children}</div>;
}

export default Box;

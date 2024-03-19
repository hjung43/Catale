import s from "classnames";
import styles from "./Box.module.css";
function Box({ children, color }) {
  return <div className={s(color ? styles.box2 : styles.box)}>{children}</div>;
}

export default Box;

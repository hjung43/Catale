import s from "classnames";
import styles from "./Header.module.css";

function Header({ children }) {
  return (
    <div className={s(styles.header)}>
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default Header;

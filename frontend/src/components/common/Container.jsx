import s from "classnames";
import styles from "./Container.module.css";

function Container({ children, width, height = "100vh" }) {
  return (
    <div
      className={s(styles.container)}
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
}

export default Container;

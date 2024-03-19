import s from "classnames";
import styles from "./Nav.module.css";
import calA from "../../assets/icon/calA.png";
import calB from "../../assets/icon/calB.png";
import homeA from "../../assets/icon/homeA.png";
import homeB from "../../assets/icon/homeB.png";
import mapA from "../../assets/icon/mapA.png";
import mapB from "../../assets/icon/mapB.png";
import searchA from "../../assets/icon/searchA.png";
import searchB from "../../assets/icon/searchB.png";
import userA from "../../assets/icon/userA.png";
import userB from "../../assets/icon/userB.png";

function Nav({ num, width, height = "7vh" }) {
  return (
    <div
      className={s(styles.nav)}
      style={{
        width,
        height,
      }}
    >
      <img src={num === 1 ? searchB : searchA} />
      <img src={num === 2 ? mapB : mapA} />
      <img src={num === 3 ? homeB : homeA} />
      <img src={num === 4 ? calB : calA} />
      <img src={num === 5 ? userB : userA} />
    </div>
  );
}

export default Nav;

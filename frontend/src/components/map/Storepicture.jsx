import styles from "./Storepicture.module.css";
import Clickyes from "../../assets/icon/Clickyes.png";
import Clickno from "../../assets/icon/Clickno.png";
import { useState } from "react";

export default function Storepicture({ images, storenumber }) {
  const [picturenumber, setPicturenumber] = useState(0);
  const numberData = [0, 1, 2];

  return (
    <>
      <div className={styles.picturemain}>
        <div className={styles.가게사진}>
          <img src={images[picturenumber]} alt="" />
        </div>
        <div className={styles.numberbox}>
          {numberData.map((number) => (
            <div
              className={styles.number}
              onClick={() => setPicturenumber(number)}
            >
              {number === picturenumber ? (
                <img className={styles.click} src={Clickyes} alt="" />
              ) : (
                <img className={styles.click} src={Clickno} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

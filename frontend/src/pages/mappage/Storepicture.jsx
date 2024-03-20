import styles from "./Storepicture.module.css";
import Clickyes from "../../assets/icon/Clickyes.png";
import Clickno from "../../assets/icon/Clickno.png";
import 럭키바 from "../../assets/store/럭키바.jpg";
import 리케리케라운지 from "../../assets/store/리케리케라운지.jpg";
import 사막의하얀꽃 from "../../assets/store/사막의하얀꽃.jpg";
import { useState } from "react";

export default function Storepicture({ storenumber }) {
  const pictureData = [럭키바, 리케리케라운지, 사막의하얀꽃];
  const [picturenumber, setPicturenumber] = useState(0);
  const numberData = [0, 1, 2];

  return (
    <>
      <div className={styles.picturemain}>
        <div className={styles.가게사진}>
          <img src={pictureData[picturenumber]} />
        </div>
        <div className={styles.numberbox}>
          {numberData.map((number) => (
            <div
              className={styles.number}
              onClick={() => setPicturenumber(number)}
            >
              {number === picturenumber ? (
                <img className={styles.click} src={Clickyes} />
              ) : (
                <img className={styles.click} src={Clickno} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

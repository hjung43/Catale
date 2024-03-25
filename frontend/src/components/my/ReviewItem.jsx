import styles from "./ReviewItem.module.css";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import like from "../../assets/common/like.png";
import noneLike from "../../assets/common/noneLike.png";

export default function ReviewItem({ item, setList }) {
  const glasses = [
    glass1,
    glass1,
    glass2,
    glass3,
    glass4,
    glass5,
    glass6,
    glass7,
  ];
  const num = [
    [],
    [35, 45, 60],
    [48, 55, 62],
    [48, 55, 62],
    [40, 53, 65],
    [30, 45, 65],
    [35, 45, 55],
    [25, 40, 55],
  ];
  const toggleLike = () => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === item.id ? { ...item, like: !item.like } : item
      )
    );
  };
  return (
    <div className={styles.item}>
      <img
        src={glasses[item.glass]}
        alt="glass"
        className={styles.glass}
        style={{
          background: `linear-gradient(0deg, ${item.color1} ${
            num[item.glass][0]
          }%, ${item.color2} ${num[item.glass][1]}%, ${item.color3} ${
            num[item.glass][2]
          }%, ${item.color3} 100%)`,
        }}
      />
      <div>
        <div className={styles.text}>{item.name}</div>
        <div className={styles.subtext}>{item.text}</div>
      </div>
      <img
        src={item.like ? like : noneLike}
        alt="like"
        className={styles.like}
        onClick={toggleLike} // 클릭하면 toggleLike 함수를 호출
      />
    </div>
  );
}

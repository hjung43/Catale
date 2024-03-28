import Container from "../../components/common/Container";
import useCocktailStore from "../../store/useCocktailStore";
import styles from "./CocktailReviewPage.module.css";
import plus1 from "../../assets/common/plus1.png";
import plus2 from "../../assets/common/plus2.png";
import minus1 from "../../assets/common/minus1.png";
import minus2 from "../../assets/common/minus2.png";
import { useState } from "react";

export default function CocktailReviewPage() {
  const cocktail = useCocktailStore((state) => state.cocktail);
  const taste = [
    ["단맛", "sweet"],
    ["쓴맛", "bitter"],
    ["신맛", "sour"],
    ["탄산", "sparking"],
  ];
  const [percent, setPercent] = useState({
    sweet: cocktail.sweet,
    bitter: cocktail.bitter,
    sour: cocktail.sour,
    sparking: cocktail.sparking,
  });

  const handleIncrement = (key) => {
    if (percent[key] < 5) {
      setPercent((prevPercent) => ({
        ...prevPercent,
        [key]: prevPercent[key] + 1,
      }));
    }
  };

  const handleDecrement = (key) => {
    if (percent[key] > 0) {
      setPercent((prevPercent) => ({
        ...prevPercent,
        [key]: prevPercent[key] - 1,
      }));
    }
  };

  return (
    <Container>
      <div>
        <div>추천</div>
        <div>{`${cocktail.name}의 리뷰작성`}</div>
        <div>완료</div>
      </div>
      <div>내가 생각하는 {cocktail.name}의 맛을 알려주세요.</div>
      {taste.map((ele, i) => (
        <div key={i} className={styles.box}>
          <div className={styles.text_box}>
            <div className={styles.text}>{ele[0]}</div>
            <div className={styles.sub_text}>
              {ele[0]}의 정도를 0%에서 100%로 골라주세요
            </div>
          </div>
          <img
            src={percent[ele[1]] === 0 ? minus1 : minus2}
            alt="minus"
            className={styles.minus}
            onClick={() => handleDecrement(ele[1])}
          />
          <div className={styles.percent}>{percent[ele[1]] * 20}%</div>
          <img
            src={percent[ele[1]] === 5 ? plus1 : plus2}
            alt="plus"
            className={styles.plus}
            onClick={() => handleIncrement(ele[1])}
          />
        </div>
      ))}
    </Container>
  );
}

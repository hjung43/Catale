import { useParams } from "react-router";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import card from "../../assets/common/card.png";
import pentagon from "../../assets/common/pentagon.png";
import styles from "./DatePage.module.css";
import s from "classnames";

export default function DatePage() {
  const { diaryId } = useParams();
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

  const response = {
    id: 5,
    memberId: 4,
    mood: 1,
    comment: "string",
    reason: "string",
    emotion1: 1,
    emotion2: 2,
    emotion3: 3,
    createdAt: "2024-03-26T13:47:06.352887",
    cocktailId: 1,
    cocktailImage:
      "https://i.namu.wiki/i/nOp6hC_Me72u23Y-HcDz71-E1-couTEJPQueDGAL_cSvzvi3ML8kiCrQM93yFXnwrcPDqpJ22l53bQIbvZY-eQ.webp",
    name: "갓파더",
    alc: 37,
    sweet: 2,
    sour: 0,
    bitter: 4,
    sparking: 0,
    color1: "#c25a00",
    color2: "#954705",
    color3: "#6d3d29",
    glass: 7,
    content:
      "강렬한 위스키의 첫맛에 달달하고 향긋한 아마레또의 향으로 마무리되는, 만드는 방법은 굉장히 간단하지만 매력적인 맛과 향을 나타내는 칵테일입니다.",
    ingredient: "스카치 위스키, 아마레또",
    base: 7,
    likeCount: 0,
    fruit: 0,
  };
  const mood = [
    "",
    "많이 속상했던 하루",
    "조금 속상했던 하루",
    "그럭저럭인 하루",
    "기분 좋은 하루",
    "정말 행복했던하루",
  ];

  const createdAt = new Date(response.createdAt);
  const month = String(createdAt.getMonth() + 1);
  const day = String(createdAt.getDate());

  const formattedDate = `${month}월 ${day}일`;
  return (
    <Container>
      <Headerwb title={formattedDate} />

      <div
        className={styles.background}
        style={{
          background: `linear-gradient(135deg, ${response.color1} 0%,  ${response.color2} 50%, ${response.color3} 100%)`,
        }}
      >
        <div className={styles.cover}>
          <div className={styles.cocktail}>
            <div
              className={styles.glass_cover}
              style={{
                background: `linear-gradient(0deg, ${response.color1} ${
                  num[response.glass][0]
                }%, ${response.color2} ${num[response.glass][1]}%, ${
                  response.color3
                } ${num[response.glass][2]}%, ${response.color3} 100%)`,
              }}
            >
              <img
                src={glasses[response.glass]}
                alt="glass"
                className={styles.glass}
              />
            </div>
            <div className={styles.name}>{response.name}</div>
            <div className={styles.content}>{response.content}</div>
            <div className={styles.cocktail_bottom}>
              <div className={styles.cocktail_left}>
                <div>기분좋은</div>
                <div>행복한</div>
                <div>짜릿한</div>
              </div>
              <div className={styles.cocktail_right}>
                <div>상세정보</div>
                <img src={pentagon} alt="pentagon" className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={styles.title}>오늘의 이야기</div>
          <div className={s(styles[`mood${response.mood}`], styles.mood)}>
            {mood[response.mood]}
          </div>
        </div>
      </div>
    </Container>
  );
}

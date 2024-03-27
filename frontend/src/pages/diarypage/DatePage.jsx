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
import pentagon from "../../assets/common/pentagon.png";
import styles from "./DatePage.module.css";
import { mood1, mood2 } from "../mainpage/Emodata/Emotionthree";
import s from "classnames";
import { useState } from "react";
import CocktailDetail from "../../components/diary/CocktailDetail";

export default function DatePage() {
  const { diaryId } = useParams();
  const [detail, setDetail] = useState(false);
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
    emotion1: 10,
    emotion2: 22,
    emotion3: 34,
    createdAt: "2024-03-26T13:47:06.352887",
    cocktailId: 1,
    cocktailImage:
      "https://i.namu.wiki/i/nOp6hC_Me72u23Y-HcDz71-E1-couTEJPQueDGAL_cSvzvi3ML8kiCrQM93yFXnwrcPDqpJ22l53bQIbvZY-eQ.webp",
    name: "데이지",
    alc: 37,
    sweet: 2,
    sour: 0,
    bitter: 4,
    sparking: 0,
    color1: "#FD5B51",
    color2: "#FAC848",
    color3: "#53BAF4",
    glass: 5,
    content:
      "브랜디 베이스의 칵테일로, 마가리타의 기원으로 추정되는 칵테일 중 하나입니다.",
    ingredient: "스카치 위스키, 아마레또",
    base: 7,
    likeCount: 0,
    fruit: 0,
  };
  const mood = [
    "",
    "많이 속상했던 날..",
    "조금 속상했던 날..",
    "그럭저럭인 날",
    "기분 좋은 날!",
    "정말 행복했던 날!!!",
  ];

  const createdAt = new Date(response.createdAt);
  const month = String(createdAt.getMonth() + 1);
  const day = String(createdAt.getDate());
  const formattedDate = `${month}월 ${day}일`;

  const emotions = [
    response.emotion1,
    response.emotion2,
    response.emotion3,
  ].filter((e) => e !== 0);

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
          <div className={styles.flip}>
            <div className={styles.card}>
              <div className={s(styles.cocktail, detail && styles.show_detail)}>
                <div
                  className={styles.glass_cover}
                  style={{
                    background: `linear-gradient(0deg, ${response.color3} ${
                      num[response.glass][0]
                    }%, ${response.color2} ${num[response.glass][1]}%, ${
                      response.color1
                    } ${num[response.glass][2]}%, ${response.color1} 100%)`,
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
                    {emotions.map((emo, i) => {
                      const index = (emo - (emo % 10)) / 10;
                      const j = emo % 10;
                      return <div>{mood1[index][j]}</div>;
                    })}
                  </div>
                  <div
                    className={styles.cocktail_right}
                    onClick={() => setDetail(true)}
                  >
                    <div>상세정보</div>
                    <img
                      src={pentagon}
                      alt="pentagon"
                      className={styles.icon}
                    />
                  </div>
                </div>
              </div>
              <div
                className={s(styles.detail, detail && styles.show_cocktail)}
                onClick={() => setDetail(false)}
              >
                <CocktailDetail cocktail={response} />
              </div>
            </div>
          </div>
          <div className={styles.title}>오늘의 이야기</div>
          <div className={s(styles[`mood${response.mood}`], styles.mood)}>
            {mood[response.mood]}
          </div>
          <div>
            <span>{response.reason}</span> 때문에
          </div>
          <div>
            {emotions.map((emo, i) => {
              const index = (emo - (emo % 10)) / 10;
              const j = emo % 10;
              if (emotions.length - 1 > i) {
                return <span>{mood2[index][j]}, </span>;
              } else {
                return <span>{mood1[index][j]}</span>;
              }
            })}
          </div>
          <div>감정을 느낀 하루였어</div>
          <br />
          <div>{response.comment}</div>
        </div>
      </div>
    </Container>
  );
}

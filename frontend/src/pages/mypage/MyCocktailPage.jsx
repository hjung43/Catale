import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./MyCocktailPage.module.css";
import s from "classnames";
import arrow_none from "../../assets/common/arrow5.png";
import arrow_active from "../../assets/common/arrow4.png";
import { useState, useEffect } from "react";
import ReviewItem from "../../components/my/ReviewItem";

export default function MyCocktailPage() {
  const [order, setOrder] = useState(true);
  const [rotate, setrotate] = useState([0, 0]);
  const [list, setList] = useState([]);
  const cocktails = [
    {
      like: true,
      id: 1,
      name: "칵테일1",
      text: "저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고",
      glass: 5,
      color1: "#923044",
      color2: "#356932",
      color3: "#123456",
      review: [
        {
          review_id: 1,
          content: "kfdfgdfgdfgdfg",
          create_at: "2024-03-21",
          rate: 4,
          sweet: 3,
          bitter: 2,
          sour: 3,
          sparkling: 5,
        },
      ],
    },
    {
      like: false,
      id: 2,
      name: "칵테일2",
      text: "맛있는 칵테일",
      glass: 3,
      color1: "#ABCDEF",
      color2: "#FEDCBA",
      color3: "#13579B",
      review: [
        {
          review_id: 3,
          content: "맛있다!",
          create_at: "2024-03-22",
          rate: 5,
          sweet: 4,
          bitter: 1,
          sour: 2,
          sparkling: 5,
        },
        {
          review_id: 4,
          content: "별로야",
          create_at: "2024-03-23",
          rate: 2,
          sweet: 2,
          bitter: 3,
          sour: 4,
          sparkling: 1,
        },
      ],
    },
    {
      like: true,
      id: 3,
      name: "칵테일3",
      text: "상큼한 칵테일",
      glass: 2,
      color1: "#F0F0F0",
      color2: "#123ABC",
      color3: "#FF0000",
      review: [
        {
          review_id: 5,
          content: "시원하고 좋아!",
          create_at: "2024-03-25",
          rate: 4,
          sweet: 3,
          bitter: 2,
          sour: 4,
          sparkling: 5,
        },
        {
          review_id: 6,
          content: "쓰구 맛있다",
          create_at: "2024-03-26",
          rate: 3,
          sweet: 3,
          bitter: 3,
          sour: 2,
          sparkling: 4,
        },
      ],
    },
    {
      like: false,
      id: 4,
      name: "칵테일4",
      text: "고급스러운 칵테일",
      glass: 5,
      color1: "#FFFFFF",
      color2: "#000000",
      color3: "#FFD700",
      review: [
        {
          review_id: 7,
          content: "정말 맛있어요!",
          create_at: "2024-03-28",
          rate: 5,
          sweet: 5,
          bitter: 2,
          sour: 3,
          sparkling: 4,
        },
        {
          review_id: 8,
          content: "너무 진하고 부담스러워요.",
          create_at: "2024-03-30",
          rate: 2,
          sweet: 2,
          bitter: 4,
          sour: 3,
          sparkling: 1,
        },
      ],
    },
    {
      like: true,
      id: 5,
      name: "칵테일5",
      text: "달달한 칵테일",
      glass: 3,
      color1: "#FF69B4",
      color2: "#00FF00",
      color3: "#FFFF00",
      review: [
        {
          review_id: 9,
          content: "너무 달아서 좋아요!",
          create_at: "2024-03-01",
          rate: 4,
          sweet: 5,
          bitter: 1,
          sour: 2,
          sparkling: 3,
        },
        {
          review_id: 10,
          content: "달기만 하고 딱히 매력 없어요.",
          create_at: "2024-03-02",
          rate: 2,
          sweet: 4,
          bitter: 2,
          sour: 3,
          sparkling: 1,
        },
      ],
    },
    {
      like: false,
      id: 6,
      name: "칵테일6",
      text: "신선한 칵테일",
      glass: 4,
      color1: "#00FFFF",
      color2: "#800080",
      color3: "#008080",
      review: [
        {
          review_id: 11,
          content: "상큼하고 맛있어요!",
          create_at: "2024-03-05",
          rate: 4,
          sweet: 3,
          bitter: 2,
          sour: 4,
          sparkling: 5,
        },
        {
          review_id: 12,
          content: "신맛이 강해서 별로에요.",
          create_at: "2024-03-06",
          rate: 2,
          sweet: 2,
          bitter: 3,
          sour: 4,
          sparkling: 1,
        },
      ],
    },
    {
      like: false,
      id: 8,
      name: "칵테일8",
      text: "고급스러운 칵테일2",
      glass: 6,
      color1: "#FFFFFF",
      color2: "#000000",
      color3: "#FFD700",
      review: [
        {
          review_id: 14,
          content: "정말 맛있어요!",
          create_at: "2024-03-10",
          rate: 5,
          sweet: 5,
          bitter: 2,
          sour: 3,
          sparkling: 4,
        },
        {
          review_id: 15,
          content: "너무 진하고 부담스러워요.",
          create_at: "2024-03-12",
          rate: 2,
          sweet: 2,
          bitter: 4,
          sour: 3,
          sparkling: 1,
        },
      ],
    },
    {
      like: true,
      id: 9,
      name: "칵테일9",
      text: "달달한 칵테일2",
      glass: 1,
      color1: "#FF69B4",
      color2: "#00FF00",
      color3: "#FFFF00",
      review: [
        {
          review_id: 16,
          content: "너무 달아서 좋아요!",
          create_at: "2024-03-15",
          rate: 4,
          sweet: 5,
          bitter: 1,
          sour: 2,
          sparkling: 3,
        },
        {
          review_id: 17,
          content: "달기만 하고 딱히 매력 없어요.",
          create_at: "2024-03-17",
          rate: 2,
          sweet: 4,
          bitter: 2,
          sour: 3,
          sparkling: 1,
        },
      ],
    },
    {
      like: false,
      id: 10,
      name: "칵테일10",
      text: "신선한 칵테일2",
      glass: 7,
      color1: "#00FFFF",
      color2: "#800080",
      color3: "#008080",
      review: [
        {
          review_id: 18,
          content: "상큼하고 맛있어요!",
          create_at: "2024-03-20",
          rate: 4,
          sweet: 3,
          bitter: 2,
          sour: 4,
          sparkling: 5,
        },
        {
          review_id: 19,
          content: "신맛이 강해서 별로에요.",
          create_at: "2024-03-22",
          rate: 2,
          sweet: 2,
          bitter: 3,
          sour: 4,
          sparkling: 1,
        },
      ],
    },
  ];
  useEffect(() => {
    setList(cocktails);
  }, []);

  const changeOrder = (num) => {
    if (num === 0 && !order) {
      setOrder(true);
      setrotate([0, 0]);
    } else if (num === 1 && order) {
      setOrder(false);
      setrotate([0, 0]);
    } else if (num === 0 && order) {
      if (rotate[0] === 0) {
        setrotate([180, 0]);
      } else {
        setrotate([0, 0]);
      }
    } else if (num === 1 && !order) {
      if (rotate[1] === 0) {
        setrotate([0, 180]);
      } else {
        setrotate([0, 0]);
      }
    }
  };

  return (
    <Container>
      <Headerwb title={"내가 마신 칵테일"} />
      <div className={styles.main}>
        <div className={styles.order}>
          <div className={styles.order_item} onClick={() => changeOrder(0)}>
            <div
              className={s(
                styles.order_text,
                order ? styles.active_order : styles.none_order
              )}
            >
              날짜순
            </div>
            <img
              src={order ? arrow_active : arrow_none}
              alt="arrow"
              className={styles.order_img}
              style={{ transform: `rotate(${rotate[0]}deg)` }}
            />
          </div>
          <div className={styles.order_item} onClick={() => changeOrder(1)}>
            <div
              className={s(
                styles.order_text,
                !order ? styles.active_order : styles.none_order
              )}
            >
              평점순
            </div>
            <img
              src={!order ? arrow_active : arrow_none}
              alt="arrow"
              className={styles.order_img}
              style={{ transform: `rotate(${rotate[1]}deg)` }}
            />
          </div>
        </div>
        <div>
          {list.map((item) => (
            <div className={styles.item}>
              <ReviewItem item={item} setList={setList} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

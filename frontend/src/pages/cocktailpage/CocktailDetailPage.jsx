import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./CocktailDetailPage.module.css";
import { Pagination } from "swiper/modules";
import CocktailDetail from "../../components/diary/CocktailDetail";
import { base } from "../../components/data/base";
import like from "../../assets/common/like.png";
import noneLike from "../../assets/common/noneLike.png";
import review from "../../assets/common/review.png";
import glass1 from "../../assets/glass/glass1.png";
import glass2 from "../../assets/glass/glass2.png";
import glass3 from "../../assets/glass/glass3.png";
import glass4 from "../../assets/glass/glass4.png";
import glass5 from "../../assets/glass/glass5.png";
import glass6 from "../../assets/glass/glass6.png";
import glass7 from "../../assets/glass/glass7.png";
import Popup from "../../components/common/Popup";
import useCocktailStore from "../../store/useCocktailStore";
import { useEffect } from "react";

export default function CocktailDetailPage() {
  const { cocktailId } = useParams();
  const setCocktail = useCocktailStore((state) => state.setCocktail);
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
  useEffect(() => {}, [cocktailId]);
  const response = {
    id: 39,
    imageUrl:
      "https://api.vip.foodnetwork.ca/wp-content/uploads/2022/06/over-the-rainbow-cocktail-beauty.jpg",
    name: "레인보우 파라다이스",
    alc: 6,
    sweet: 5,
    sour: 2,
    bitter: 0,
    sparking: 0,
    color1: "#FD5B51",
    color2: "#FAC848",
    color3: "#53BAF4",
    glass: 5,
    content:
      "럼 베이스 칵테일로, 유래는 아일랜드라고 합니다. 무지개 색으로 플로팅되어 무척 아름다운 색깔을 자랑하며, 덕분에 해외에서 무척 유명한 칵테일이기도 합니다. 유명한 만큼 변형도 무척 많은데, 리큐르 하나를 더 추가하거나, 슬러시 형태로 만들기도 하는 등 다양합니다.",
    ingredient: "말리부, 그레나딘 시럽, 파인애플 주스, 물, 블루 큐라소",
    base: 2,
    emotion1: 2,
    emotion2: 4,
    emotion3: 9,
    likeCount: 0,
    fruit: 4,
    like: false,
  };
  setCocktail(response);
  // const handleLikeClick = () => {

  // }
  return (
    <Container>
      <Headerwb title={response.name} />
      <img
        src={response.like ? like : noneLike}
        alt="like"
        className={styles.like}
        // onClick={() => handleLikeClick()}
      />
      <div className={styles.top}>
        <Swiper
          className={styles.swiper}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div
              className={styles.glass_cover}
              style={{
                background: `linear-gradient(180deg, ${response.color3} ${
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
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={styles.img}
              style={{
                background: `url("${response.imageUrl}") no-repeat center/cover`,
              }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        className={styles.background}
        style={{
          background: `linear-gradient(135deg, ${response.color1} 0%,  ${response.color2} 50%, ${response.color3} 100%)`,
        }}
      >
        <div className={styles.cover}>
          <div className={styles.content}>{response.content}</div>
          <div className={styles.chart}>
            <CocktailDetail cocktail={response} btn={false} />
          </div>
          <div className={styles.ingredient}>{response.ingredient}</div>
          <div className={styles.review}>{response.name} 리뷰</div>
        </div>
      </div>
      <div className={styles.popup}>
        <Popup
          img={review}
          subText={`${response.name}를 드신적이 있나요?`}
          text={"리뷰 작성하러 가기"}
          src={"review"}
        />
      </div>
    </Container>
  );
}

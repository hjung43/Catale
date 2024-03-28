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
import { useEffect, useState } from "react";
import { cocktaildetail } from "../../api/Cocktail";

export default function CocktailDetailPage() {
  const { cocktailId } = useParams();
  const setCocktail = useCocktailStore((state) => state.setCocktail);
  const cocktail = useCocktailStore((state) => state.cocktail);
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
  useEffect(() => {
    const fetchData = async () => {
      const cocktails = await cocktaildetail(cocktailId);
      console.log(cocktails.data);
      setCocktail(cocktails.data);
    };

    fetchData();

    // 컴포넌트가 언마운트될 때 Swiper를 파괴합니다.
    return () => {
      if (mySwiper) {
        mySwiper.destroy();
      }
    };
  }, []);

  // Swiper 객체를 상태로 유지합니다.
  const [mySwiper, setMySwiper] = useState(null);

  return (
    <Container>
      <Headerwb title={cocktail.name} />
      <img
        src={cocktail.like ? like : noneLike}
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
          onSwiper={setMySwiper} // Swiper 객체를 설정합니다.
        >
          <SwiperSlide>
            <div
              className={styles.glass_cover}
              style={{
                background: `linear-gradient(180deg, ${cocktail.color3} ${
                  num[cocktail.glass][0]
                }%, ${cocktail.color2} ${num[cocktail.glass][1]}%, ${
                  cocktail.color1
                } ${num[cocktail.glass][2]}%, ${cocktail.color1} 100%)`,
              }}
            >
              <img
                src={glasses[cocktail.glass]}
                alt="glass"
                className={styles.glass}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={styles.img}
              style={{
                background: `url("${cocktail.imageUrl}") no-repeat center/cover`,
              }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        className={styles.background}
        style={{
          background: `linear-gradient(135deg, ${cocktail.color1} 0%,  ${cocktail.color2} 50%, ${cocktail.color3} 100%)`,
        }}
      >
        <div className={styles.cover}>
          <div className={styles.content}>{cocktail.content}</div>
          <div className={styles.chart}>
            <CocktailDetail cocktail={cocktail} btn={false} />
          </div>
          <div className={styles.ingredient}>{cocktail.ingredient}</div>
          <div className={styles.review}>{cocktail.name} 리뷰</div>
        </div>
      </div>
      <div className={styles.popup}>
        <Popup
          img={review}
          subText={`${cocktail.name}를 드신적이 있나요?`}
          text={"리뷰 작성하러 가기"}
          src={"review"}
        />
      </div>
    </Container>
  );
}

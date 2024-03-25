import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import styles from "./RecommendPage.module.css";
import CocktailBoxBig from "../../components/main/CocktailBoxBig";

export default function RecommendPage() {
  const [list, setList] = useState([]);
  const cocktails = [
    {
      like: true,
      id: 1,
      name: "칵테일1",
      text: "어쩌고저쩌고 칵테일이빈다.\n ㅇ라홀하로헐ㅇ허ㅣㅇ리ㅓㅎ \n ㄴ오ㅓㄹ마엃ㄹㅇ허옳.",
      glass: 5,
      color1: "#923044",
      color2: "#356932",
      color3: "#123456",
    },
    {
      like: true,
      id: 2,
      name: "칵테일2",
      glass: 6,
      color1: "#f39833",
      color2: "#998792",
      color3: "#193293",
    },
    {
      like: true,
      id: 3,
      name: "칵테일3",
      glass: 7,
      color1: "#945334",
      color2: "#390983",
      color3: "#135983",
    },
    {
      like: true,
      id: 4,
      name: "칵테일4",
      glass: 4,
      color1: "#983472",
      color2: "#829422",
      color3: "#397597",
    },
    {
      like: true,
      id: 5,
      name: "칵테일5",
      glass: 5,
      color1: "#983472",
      color2: "#829422",
      color3: "#397597",
    },
  ];
  useEffect(() => {
    setList(cocktails);
  }, []);
  return (
    <Container>
      <Headerwb title={"나의 취향"} />
      <div className={styles.title}>
        <div className={styles.main_title}>오늘의 추천</div>
        <div className={styles.sub_title}>
          서또카늘 님의 취향을 기반으로 추천하는 칵테일입니다.
        </div>
      </div>
      <div className={styles.main}>
        {list.map((cocktail) => (
          <CocktailBoxBig
            cocktail={cocktail}
            key={cocktail.id}
            setList={setList}
          />
        ))}
      </div>
    </Container>
  );
}

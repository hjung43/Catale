import { useEffect, useState } from "react";
import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import CocktailBox from "../../components/main/CocktailBox";
import styles from "./LikedCocktailPage.module.css";

export default function LikedCocktailPage() {
  const [list, setList] = useState([]);
  const cocktails = [
    {
      like: true,
      id: 1,
      name: "칵테일1",
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
  ];
  useEffect(() => {
    setList(cocktails);
  }, []);

  return (
    <Container>
      <Headerwb title={"좋아하는 칵테일"} />
      <div className={styles.main}>
        {list.map((cocktail) => (
          <CocktailBox
            cocktail={cocktail}
            key={cocktail.id}
            setList={setList}
          />
        ))}
      </div>
    </Container>
  );
}

import styles from "./Storemenu.module.css";
import { useState } from "react";
import Box from "../common/Box";

export default function Storemenu({ menus, storenumber }) {
  const [cocktailVisibility, setCocktailVisibility] = useState(
    new Array(4).fill(true)
  );
  //여기서 숫자를 그거로 변경해 뭐냐 도수에 따라 나눌때 그 집합개수로 설정

  const toggleCocktailVisibility = (index) => {
    const newVisibility = [...cocktailVisibility];
    newVisibility[index] = !newVisibility[index];
    setCocktailVisibility(newVisibility);
  };

  return (
    <>
      <div className={styles.menumain}>
        <div className={styles.메뉴폰트}>{storenumber}번가게 메뉴</div>
        <div className={styles.칵테일박스}>
          {cocktailVisibility.map((isVisible, index) => (
            <div key={index}>
              <div className={styles.boxtop}>
                <div>여기는 도수에따라 달라지게할거야</div>
                <div onClick={() => toggleCocktailVisibility(index)}>
                  {isVisible ? "숨기기" : "보이기"}
                </div>
              </div>
              {isVisible && (
                <div className={styles.칵테일전부}>
                  <Box>
                    <div className={styles.칵테일하나}>
                      <div>칵테일사진</div>
                      <div>칵테일이름</div>
                      <div>칵테일가격</div>
                      <div>칵테일 상세정보로 가기</div>
                    </div>
                  </Box>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

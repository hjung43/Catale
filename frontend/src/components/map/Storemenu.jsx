import styles from "./Storemenu.module.css";
import { useState } from "react";
import Box from "../common/Box";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/common/arrow4.png";
export default function Storemenu({ menus, storenumber, storename }) {
  // 도수에 따라 메뉴를 그룹화하는 함수

  const navigate = useNavigate();
  const groupMenusByAlcohol = () => {
    const groupedMenus = [[], [], [], [], [], []]; // 도수별 그룹을 저장할 배열
    menus.forEach((menu) => {
      if (menu.alc === 0) {
        groupedMenus[0].push(menu);
      } else if (menu.alc <= 10) {
        groupedMenus[1].push(menu);
      } else if (menu.alc <= 15) {
        groupedMenus[2].push(menu);
      } else if (menu.alc <= 20) {
        groupedMenus[3].push(menu);
      } else if (menu.alc <= 30) {
        groupedMenus[4].push(menu);
      } else {
        groupedMenus[5].push(menu);
      }
    });
    return groupedMenus;
  };

  const [cocktailVisibility, setCocktailVisibility] = useState(
    new Array(6).fill(true) // 도수별 그룹 개수만큼 초기값 생성
  );
  const [deg, setDeg] = useState([0, 0, 0, 0, 0, 0]);

  const toggleCocktailVisibility = (index) => {
    const newVisibility = [...cocktailVisibility];
    newVisibility[index] = !newVisibility[index];
    setCocktailVisibility(newVisibility);
  };

  return (
    <>
      <div className={styles.menumain}>
        <div className={styles.메뉴폰트}>{storename}' cocktail</div>
        <div className={styles.칵테일박스}>
          {groupMenusByAlcohol().map((group, index) => (
            <>
              {group.length > 0 && (
                <div key={index}>
                  <div className={styles.boxtop}>
                    <div>
                      {/* 도수 구간 표시 */}
                      {index === 0
                        ? "무알콜"
                        : index === 1
                        ? "1도 - 10도"
                        : index === 2
                        ? "11도 - 15도"
                        : index === 3
                        ? "16도 - 20도"
                        : index === 4
                        ? "21도 - 30도"
                        : "30도 이상"}{" "}
                    </div>
                    <div onClick={() => toggleCocktailVisibility(index)}>
                      <img
                        src={arrow}
                        alt="arrow"
                        className={styles.arrow}
                        style={
                          cocktailVisibility[index]
                            ? { transform: `rotate(${deg[index]}deg)` }
                            : { transform: `rotate(${deg[index] + 180}deg)` }
                        }
                      />
                    </div>
                  </div>
                  {cocktailVisibility[index] && (
                    <div className={styles.칵테일전부}>
                      <Box>
                        <div className={styles.칵테일정보창}>
                          <div>칵테일</div>
                          <div>가격</div>
                          <div>도수</div>
                        </div>
                        {group.map((menu) => (
                          <div
                            className={styles.칵테일박스박스}
                            onClick={() =>
                              navigate(`../../cocktail/${menu.cocktailId}`)
                            }
                            key={menu.id}
                          >
                            <div
                              className={
                                menu.signature
                                  ? styles.시그니쳐박스
                                  : styles.칵테일하나
                              }
                            >
                              {/* 칵테일 사진을 표시 */}
                              <div className={styles.칵테일오른쪽}>
                                <div
                                  className={styles.칵테일사진}
                                  style={{
                                    backgroundImage: `url(${menu.imgUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                ></div>
                                <div className={styles.칵테일이름}>
                                  {menu.cocktailName}
                                </div>
                              </div>
                              {/* 메뉴 이름 또는 필요한 정보 표시 */}
                              <div className={styles.칵테일가격}>
                                {menu.price}원
                              </div>
                              {/* 메뉴 가격 또는 필요한 정보 표시 */}
                              <div className={styles.칵테일도수}>
                                {menu.alc}%
                              </div>
                            </div>
                          </div>
                        </div>
                        <img src={arrow} alt="arrow" className={styles.arrow} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </>
  );
}

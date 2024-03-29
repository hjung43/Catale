import Container from "../components/common/Container";
import styles from "./SearchPage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import Box from "../components/common/Box";
import {
  getcocktaillist,
  cocktailsearchname,
  cocktailsearchoption,
} from "../api/Cocktail";
import { useEffect, useState } from "react";
import CocktailBox2 from "../components/main/CocktailBox2";
import CocktailBox from "../components/main/CocktailBox";
import 이퀄 from "../assets/icon/이퀄라이저.png";
import 돋보기 from "../assets/icon/검색돋보기.png";
import arrow from "../assets/common/arrow1.png";
import s from "classnames";
import Searchbase from "../components/search/Searchbase";
import Searchoption from "../components/search/Searchoption";
import { alctalk, opttalk } from "../components/data/searchtalk";
export default function SearchPage() {
  const [searchcheck, setSearchcheck] = useState(false);
  const [list, setList] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  const [searchname, setSearchname] = useState("");
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState({
    base: -1,
    alc: 0,
    sweet: 0,
    sour: 0,
    bitter: 0,
    sparkling: 0,
  });
  const [optionstrue, setOptionstrue] = useState({
    base: false,
    alc: false,
    sweet: false,
    sour: false,
    bitter: false,
    sparkling: false,
  });

  console.log(options);

  /*
1데킬라
2럼
3리큐르
4맥주
5보드카
6브랜디
7위스키
8진
9전통주
10논알콜
*/
  const handlesearch = async () => {
    try {
      const response = await cocktailsearchname(searchname);
      if (response.status === "SUCCESS") {
        console.log(response.data);
        setSearchlist(response.data);
        setSearchcheck(true);
      } else {
        console.log("에러난듯");
      }
    } catch (e) {
      console.log("에러남222");
    }
  };
  const handleChange = (e) => {
    setSearchname(e.target.value);
  };

  const handleeq = async () => {
    try {
      // 변경할 새로운 options 객체 생성
      const newOptions = { ...options };
      // optionstrue 객체의 각 키에 대해 반복하여 처리합니다.
      for (const key in optionstrue) {
        if (optionstrue[key]) {
          // optionstrue의 key가 true인 경우, 해당하는 options의 값을 -1로 설정합니다.
          newOptions[key] = -1;
        }
      }
      // 변경된 options 값으로 검색을 수행합니다.
      const response = await cocktailsearchoption(newOptions);
      console.log(newOptions);
      if (response.status === "SUCCESS") {
        console.log(response.data);
        setSearchlist(response.data);
        setSearchcheck(true);
        setModal(false);
      } else {
        console.log("에러난듯");
      }
    } catch (e) {
      console.log("에러남222");
    }
  };

  useEffect(() => {
    async function fetchlistData() {
      const formData = { page: 0, size: 30 };
      try {
        const response = await getcocktaillist(formData);
        console.log(response);
        setList([...list, ...response.data]);
      } catch (error) {
        console.error("데이터불러오기실패");
      }
    }
    fetchlistData();
  }, []);

  return (
    <Container>
      <Header>검색</Header>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.검색창}>
            <img
              className={styles.돋보기}
              src={돋보기}
              alt=""
              onClick={() => handlesearch()}
            />
            <input
              className={styles.검색인풋창}
              type="text"
              value={searchname}
              onChange={handleChange}
            />
          </div>
          <div className={styles.이퀄박스} onClick={() => setModal(true)}>
            <img className={styles.이퀄} src={이퀄} alt="" />
          </div>
        </div>

        {searchcheck && (
          <>
            <div className={styles.검색했을때}>
              <div className={styles.검색결과폰트}>검색결과</div>
              <div className={styles.검색결과}>
                {searchlist.map((data, index) => (
                  <>
                    <>
                      {/* 검색결과는 이거로 뜨게하면될거같긴한대 */}
                      <CocktailBox2 cocktail={data} setList={setSearchlist} />
                    </>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
        {!searchcheck && (
          <>
            <div className={styles.검색했을때}>
              <div className={styles.검색결과폰트}>검색결과</div>
              <div className={styles.검색결과}>
                {list.map((data, index) => (
                  <>
                    <>
                      {/* 검색결과는 이거로 뜨게하면될거같긴한대 */}
                      <CocktailBox cocktail={data} setList={setList} />
                    </>
                  </>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={s(styles.blur, modal ? styles.active : styles.no)}
        onClick={() => setModal(false)}
      ></div>
      <div className={s(styles.modal, !modal && styles.none)}>
        <div className={styles.option_top}>
          <img
            src={arrow}
            alt="arrow"
            className={styles.arrow}
            onClick={() => setModal(false)}
          />
          <div className={styles.option_title}>옵션</div>
          <div className={styles.arrow}></div>
        </div>
        {/* <Searchbase searchbase={searbase} setSearchbase={setSearbase} /> */}
        <Searchoption
          key="alc"
          searchopt={options.alc}
          setSearchopt={setOptions}
          optionstrue={optionstrue.alc}
          setOptionstrue={setOptionstrue}
          optionKey="alc"
          talk={alctalk}
          title="도수"
        />
        <Searchoption
          key="sweet"
          searchopt={options.sweet}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sweet}
          setOptionstrue={setOptionstrue}
          optionKey="sweet"
          talk={opttalk}
          title="단맛"
        />
        <Searchoption
          key="sour"
          searchopt={options.sour}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sour}
          setOptionstrue={setOptionstrue}
          optionKey="sour"
          talk={opttalk}
          title="신맛"
        />
        <Searchoption
          key="bitter"
          searchopt={options.bitter}
          setSearchopt={setOptions}
          optionstrue={optionstrue.bitter}
          setOptionstrue={setOptionstrue}
          optionKey="bitter"
          talk={opttalk}
          title="쓴맛"
        />
        <Searchoption
          key="sparkling"
          searchopt={options.sparkling}
          setSearchopt={setOptions}
          optionstrue={optionstrue.sparkling}
          setOptionstrue={setOptionstrue}
          optionKey="sparkling"
          talk={opttalk}
          title="탄산"
        />
        <div className={styles.검색하기} onClick={() => handleeq()}>
          검색하기
        </div>
      </div>
      <Nav num={1} />
    </Container>
  );
}

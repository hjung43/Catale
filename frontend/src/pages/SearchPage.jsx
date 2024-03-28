import Container from "../components/common/Container";
import styles from "./SearchPage.module.css";
import Nav from "../components/common/Nav";
import Header from "../components/common/Header";
import Box from "../components/common/Box";
import { getcocktaillist, cocktailsearchname } from "../api/Cocktail";
import { useEffect, useState } from "react";
import CocktailBox2 from "../components/main/CocktailBox2";
import CocktailBox from "../components/main/CocktailBox";
import 이퀄 from "../assets/icon/이퀄라이저.png";
import 돋보기 from "../assets/icon/검색돋보기.png";
import arrow from "../assets/common/arrow1.png";
import s from "classnames";

export default function SearchPage() {
  const [searchcheck, setSearchcheck] = useState(false);
  const [list, setList] = useState([]);
  const [searchlist, setSearchlist] = useState([]);
  const [searchname, setSearchname] = useState("");
  const [modal, setModal] = useState(false);

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
        <div onClick={() => setModal(false)}>
          <div className={styles.option_top}>
            <img src={arrow} alt="arrow" className={styles.arrow} />
            <div className={styles.option_title}>옵션</div>
            <div className={styles.arrow}></div>
          </div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
          <div className={styles.option}>내용</div>
        </div>
      </div>
      <Nav num={1} />
    </Container>
  );
}

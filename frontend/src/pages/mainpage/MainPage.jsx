import ContainerMain from "../../components/common/ContainerMain";
import styles from "./MainPage.module.css";
import Nav from "../../components/common/Nav";
import 배경바 from "../../assets/bartender/임시바배경.png";
import React from "react";
import { useState } from "react";
import Cattalkbox from "../../components/main/Cattalkbox";
import { talkarr } from "./Talkdata/Talkarr";
import Userselctbox from "../../components/main/Userselctbox";
import Usertalkbox from "../../components/main/Usertalkbox";
import Usertodayemo from "../../components/main/Usertodayemo";
import 고양이말풍선 from "../../assets/bartender/고양이말풍선.png";
import 유저말풍선 from "../../assets/bartender/유저말풍선.png";
import Useremothree from "../../components/main/Useremothree";
import { mood1, mood2 } from "../mainpage/Emodata/Emotionthree";
export default function MainPage() {
  const [talknum, setTalknum] = useState(1);
  const [selectnum, setSeletnum] = useState(0);
  //이건 오늘의 기분 하나를 담은거야
  const [nowemonum, setNowemonum] = useState(-1);

  const [todayemo, setTodayemo] = useState([]);
  //선택했는지확인
  const [selectcheck, setSelectcheck] = useState(false);
  // cattalk에서 0은 없는거 1은 다음버튼있는거 2는 다음버튼없는거 3은 고르시오
  // usertakl에서 0은 없는거 1은 대화 2,3,4,5,6,7은 특정고르기
  return (
    <ContainerMain>
      <div className={styles.main}>
        {talknum >= 8 && nowemonum !== -1 && (
          <>
            <div className={styles.재료상자}>
              <div className={styles.재료}>
                <div className={styles.재료글자}>오늘의 재료</div>
                <div className={styles.감정선택요소}>
                  <div>{nowemonum}</div>
                  {todayemo.map((emo) => (
                    <>{emo}</>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* 이거로 지금 배경바 크기를 지정해놨음 */}
        <div className={styles.aspectcontainer}>
          <div className={styles.aspectcontent}>
            <img src={배경바} alt="" />
          </div>
        </div>
        {/*  */}
        {talknum !== 3 &&
          talknum !== 4 &&
          talknum !== 10 &&
          talknum !== 14 &&
          talknum !== 16 &&
          talknum !== 22 && (
            <Cattalkbox
              talknum={talknum}
              setTalknum={setTalknum}
              talkarr={talkarr[talknum]}
              말풍선={고양이말풍선}
            />
          )}
        {(talknum === 3 || talknum === 4 || talknum === 22) && (
          <Cattalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectnum={selectnum}
            말풍선={고양이말풍선}
          />
        )}
        {(talknum === 10 || talknum === 14 || talknum === 16) && (
          <Cattalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectcheck={selectcheck}
          />
        )}
        {(talknum === 2 || talknum === 11 || talknum === 21) && (
          <Userselctbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            setSeletnum={setSeletnum}
          />
        )}
        {(talknum === 3 || talknum === 22) && (
          <Usertalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            selectnum={selectnum}
            말풍선={유저말풍선}
          />
        )}
        {(talknum === 6 || talknum === 12) && (
          <Usertalkbox
            talknum={talknum}
            setTalknum={setTalknum}
            talkarr={talkarr[talknum]}
            말풍선={유저말풍선}
          />
        )}
        {talknum === 5 && (
          //여기서 감정고르는건데 그거 고르는거 숫자 가져가자
          <Usertodayemo
            talknum={talknum}
            setTalknum={setTalknum}
            setNowemonum={setNowemonum}
          />
        )}
        {talknum === 10 && (
          //여기서 감정고르는건데 그거 고르는거 숫자 가져가자
          <Useremothree
            todayemo={todayemo}
            setTodayemo={setTodayemo}
            setSelectcheck={setSelectcheck}
            mood1={mood1}
          />
        )}
      </div>
      <Nav num={3} />
    </ContainerMain>
  );
}

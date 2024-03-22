import styles from "./Cattalkbox.module.css";
// import 고양이말풍선 from "../../assets/bartender/고양이말풍선.png";
// import 파란말풍선 from "../../assets/bartender/파란말풍선.png";
import { cattalk } from "../../pages/mainpage/Talkdata/Cattalk";
import React from "react";

export default function Cattalkbox({
  talknum,
  setTalknum,
  talkarr,
  selectnum = -1,
  selectcheck,
  말풍선,
}) {
  // console.log(talkarr);
  return (
    <>
      {selectnum === -1 && talkarr.cat !== 0 && talkarr.cat !== 3 && (
        <div className={styles.고양이말풍선}>
          {talkarr.cat !== 3 ? (
            <img className={styles.말풍선} src={말풍선} alt="" />
          ) : (
            <>
              <div className={styles.만들자말풍선} />
            </>
          )}

          {talkarr.cat !== 3 && (
            <>
              <div className={styles.고양이이름}>고먐미</div>
              <div className={styles.고양이내용}>
                <>
                  {cattalk[talkarr.cattalk].talk
                    .split("\n")
                    .map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </>
              </div>
            </>
          )}
          {talkarr.cat === 1 && (
            <div
              className={styles.고양이다음}
              onClick={() => setTalknum(talknum + 1)}
            >
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
      {selectnum === -1 && talkarr.cat !== 0 && talkarr.cat === 3 && (
        <div className={styles.고양이말풍선2}>
          {talkarr.cat !== 3 ? (
            <img className={styles.말풍선} src={말풍선} alt="" />
          ) : (
            <>
              <div className={styles.만들자말풍선} />
            </>
          )}

          {talkarr.cat === 3 && (
            <>
              <div className={styles.고양이내용파랑}>
                <>
                  {" "}
                  <div className={styles.여기에만}>
                    {cattalk[talkarr.cattalk].talk
                      .split("\n")
                      .map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                  </div>
                  {talknum === 10 && selectcheck && (
                    <div
                      className={styles.네모박스}
                      onClick={() => setTalknum(talknum + 1)}
                    >
                      <span className={styles.다음으로}>선택완료</span>
                    </div>
                  )}
                </>
              </div>
            </>
          )}
          {talkarr.cat === 1 && (
            <div
              className={styles.고양이다음}
              onClick={() => setTalknum(talknum + 1)}
            >
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
      {selectnum !== -1 && talkarr[selectnum].cat !== 0 && (
        <div className={styles.고양이말풍선}>
          <img className={styles.말풍선} src={말풍선} alt="" />
          <div className={styles.고양이이름}>고먐미</div>
          <div className={styles.고양이내용}>
            <>
              {cattalk[talkarr[selectnum].cattalk].talk
                .split("\n")
                .map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </>
          </div>
          {talknum === 4 && selectnum === 0 ? (
            <div className={styles.고양이다음} onClick={() => setTalknum(2)}>
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          ) : (
            <div
              className={styles.고양이다음}
              onClick={() => setTalknum(talknum + 1)}
            >
              <div className={styles.click}>click !</div>
              <div className={styles.역삼각형}></div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

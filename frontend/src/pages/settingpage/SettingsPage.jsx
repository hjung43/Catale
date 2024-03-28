import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import useUserStore from "../../store/useUserStore";
import profile from "../../assets/common/profile.png";
import arrow from "../../assets/common/arrow3.png";
import close from "../../assets/common/close.png";
import styles from "./SettingsPage.module.css";
import s from "classnames";
import { useState } from "react";

export default function SettingsPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [modal, setModal] = useState([false, false]);
  return (
    <Container>
      <Headerwb title={"계정 설정"} />
      <div className={styles.box}>메롱</div>
      <div className={styles.box2}>
        <div className={styles.profile_box}>
          <img src={profile} alt="profile" className={styles.profile} />
        </div>
        <div className={styles.img_set}>
          <div>프로필 사진 변경</div>
          <div className={styles.img_delete}>프로필 사진 제거</div>
        </div>
        <div className={styles.item} onClick={() => setModal([true, false])}>
          <div>
            <div className={styles.item_text}>닉네임 변경</div>
            <div className={styles.item_subtext}>{user.nickname}</div>
          </div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div className={styles.item} onClick={() => setModal([false, true])}>
          <div>
            <div className={styles.item_text}>비밀번호 변경</div>
            <div className={styles.item_subtext}>
              보안을 위해 3개월에 1번 변경 권장
            </div>
          </div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div className={styles.dis_item}>
          <div className={styles.dis_text}>계정탈퇴</div>
          <img src={arrow} alt="arrow" className={styles.icon} />
        </div>
        <div className={styles.btn}>완료</div>
      </div>

      <div
        className={s(
          styles.blur,
          modal[0] || modal[1] ? styles.active : styles.no
        )}
        onClick={() => setModal([false, false])}
      ></div>

      <div className={s(styles.modal, !modal[0] && styles.none)}>
        <div className={styles.flex}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal([false, false])}
          />
          <div className={styles.title}>닉네임변경</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.subtitle}>새로운 닉네임 입력</div>
        <div className={styles.input_box}>
          <input
            type="text"
            placeholder={user.nickname}
            className={styles.input}
          />
          <div className={styles.input_check}>중복확인</div>
        </div>
        <div className={styles.error}>이미 존재하는 닉네임입니다</div>
        <div className={styles.btn2}>확인</div>
      </div>
    </Container>
  );
}

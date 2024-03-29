import Container from "../../components/common/Container";
import Headerwb from "../../components/common/Headerwb";
import useUserStore from "../../store/useUserStore";
import profile from "../../assets/common/profile.png";
import arrow from "../../assets/common/arrow3.png";
import close from "../../assets/common/close.png";
import styles from "./SettingsPage.module.css";
import s from "classnames";
import { useState } from "react";
import FileInput from "../../components/common/FileInput";

export default function SettingsPage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [modal, setModal] = useState([false, false]);
  const [frameimgurl, setFrameimgurl] = useState(profile);
  const [value, setValue] = useState({});
  const [password, setPassword] = useState({
    pw: "",
    check: "",
  });
  const [errorMessage, setErrorMessage] = useState(
    "소문자,숫자 필수 / 대문자,특수문자 선택 / 5~20글자"
  );
  const handleChangePw = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (password.pw !== value) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else if (password.pw === "") {
      setErrorMessage("소문자,숫자 필수 / 대문자,특수문자 선택 / 최소 5글자");
    } else {
      setErrorMessage("일치! 구웃");
    }
  };
  const handleChangeValue = (name, value) => {
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleImg = () => {
    const nextPreview = URL.createObjectURL(value.frameImage);
    setFrameimgurl(nextPreview);
  };
  return (
    <Container>
      <Headerwb title={"계정 설정"} />
      <div className={styles.box}>메롱</div>
      <div className={styles.box2}>
        <div className={styles.profile_box}>
          <FileInput
            className={styles.profile}
            name="frameImage"
            value={value.frameImage}
            onChange={handleChangeValue}
            initialPreview={frameimgurl}
          />
        </div>
        <div className={styles.img_set}>
          {value.frameImage && (
            <div
              className={styles.inputButton}
              onClick={() => value.frameImage && handleImg()}
            >
              프로필 사진 변경
            </div>
          )}
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
          <input placeholder={user.nickname} className={styles.input} />
          <div className={styles.input_check}>중복확인</div>
        </div>
        <div className={styles.error}>이미 존재하는 닉네임입니다</div>
        <div className={styles.btn2}>확인</div>
      </div>
      <div className={s(styles.modal, !modal[1] && styles.none)}>
        <div className={styles.flex}>
          <img
            src={close}
            alt="close"
            className={styles.icon}
            onClick={() => setModal([false, false])}
          />
          <div className={styles.title}>비밀번호변경</div>
          <div className={styles.icon}></div>
        </div>
        <div className={styles.subtitle}>새로운 비밀번호입력</div>

        <input
          type="password"
          placeholder="새 비밀번호 입력"
          className={styles.pw}
          name="pw"
          value={password.pw}
          onChange={handleChangePw}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className={styles.pw}
          name="check"
          value={password.check}
          onChange={handleChangePw}
        />

        <div className={styles.error}>{errorMessage}</div>
        <div className={styles.btn2}>확인</div>
      </div>
    </Container>
  );
}

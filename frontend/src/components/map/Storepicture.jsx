import styles from "./Storepicture.module.css";
import Clickyes from "../../assets/icon/Clickyes.png";
import Clickno from "../../assets/icon/Clickno.png";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import s from "classnames";
import "swiper/css";
import "swiper/css/pagination";

export default function Storepicture({ images, storenumber }) {
  return (
    <>
      <div className={styles.picturemain}>
        <Swiper
          className={styles.swiper}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <img src={images[0]} alt="" className={styles.img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images[1]} alt="" className={styles.img} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images[2]} alt="" className={styles.img} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

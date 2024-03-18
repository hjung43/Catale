import { useEffect, useRef } from "react";
import styles from "./map.module.css";
import { markerdata } from "./data/markerData";


function makeInfowindowContent(title) {
    return `
        <div style="padding: 10px;">
            <h2>${title}</h2>
            <p>서만기바보.</p>
        </div>
    `;
}


export default function Map() {
    const { kakao } = window;
    const mapRef = useRef(null);

    useEffect(() => {
        mapscript();
    }, []);

    const mapscript = () => {
        const container = mapRef.current; // mapRef를 통해 요소를 가져옵니다.
        if (!container) return; // 요소가 없으면 함수를 종료합니다.

        const options = {
            center: new kakao.maps.LatLng(36.3573677, 127.346910),
            level: 4,
        };

        // 지도 생성
        const map = new kakao.maps.Map(container, options);

        // 마커 추가
        markerdata.forEach((el) => {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
            });
            const infowindow = new kakao.maps.InfoWindow({
                content: makeInfowindowContent(el.title)
            });
            kakao.maps.event.addListener(
                marker,
                "mouseover",
                makeOverListener(map, marker, infowindow)
            );
            kakao.maps.event.addListener(
                marker,
                "mouseout",
                makeOutListener(infowindow)
            );
        });
    };

    // 인포윈도우를 표시하는 클로저를 만드는 함수
    function makeOverListener(map, marker, infowindow) {
        return function () {
            infowindow.open(map, marker);
        };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수
    function makeOutListener(infowindow) {
        return function () {
            infowindow.close();
        };
    }

    return (
        <div className={styles.map} ref={mapRef}></div>
    );
}

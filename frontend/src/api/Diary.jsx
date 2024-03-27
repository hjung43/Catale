import axios from "axios";
const BASE_URL = "https://api.silvstone.xyz/api/v1/diary";

// 월별 다이어리 조회
export async function monthdiary(year, month) {
  const params = {
    year: year,
    month: month,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 다이어리 저장
export async function savadiary(today) {
  try {
    const response = await axios.post(BASE_URL, today);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//다이어리 상세조회
export async function detaildiary(id) {
  try {
    const response = await axios.get(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//다이어리 삭제하기
export async function deletediary(id) {
  try {
    const response = await axios.delete(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

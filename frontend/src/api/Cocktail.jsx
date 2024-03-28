import axios from "axios";
const BASE_URL = "https://api.silvstone.xyz/api/v1/cocktail";

//칵테일 전체 조회
export async function getcocktaillist(option) {
  const params = {
    page: option.page,
    size: option.size,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//칵테일 상세조회 -> 하나!!!!
export async function cocktaildetail(id) {
  try {
    const response = await axios.get(BASE_URL + `/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//칵테일 좋아요
export async function cocktaillike(id) {
  try {
    const response = await axios.get(BASE_URL + `/${id}/like`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//오늘의칵테일 아직 미완성!

//칵테일 이름으로 검색하기
export async function cocktailsearchname(name) {
  const params = {
    keyword: name,
  };
  try {
    const response = await axios.get(BASE_URL + "/search", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//칵테일 이퀄라이저로 검색하기 (상관없음은 -1 이다)
export async function cocktailsearchoption(option) {
  const params = {
    base: option.name,
    alc: option.alc,
    sweet: option.sweet,
    sour: option.sour,
    bitter: option.bitter,
    sparkling: option.sparkling,
  };
  try {
    const response = await axios.get(BASE_URL + "/option", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//내가 좋아하는 칵테일 조회
export async function cocktailmelike(option) {
  const params = {
    page: option.page,
    size: option.size,
  };
  try {
    const response = await axios.get(BASE_URL + "/like", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//내가 리뷰남긴 칵테일 조회
export async function cocktailmereview(option) {
  const params = {
    page: option.page,
    size: option.size,
  };
  try {
    const response = await axios.get(BASE_URL + "/reviewed", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

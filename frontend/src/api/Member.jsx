import axios from "axios";
const BASE_URL = "https://api.silvstone.xyz/api/v1/member";
// https://api.silvstone.xyz/api/v1/member/preference

// 일반 회원가입
export async function signup(user) {
  try {
    const response = await axios.post(BASE_URL + "/signup", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 이메일 인증 요청
export async function checkEmail(email) {
  try {
    const response = await axios.post(BASE_URL + `/email/verification`, email);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//로그인
export async function login(user) {
  try {
    localStorage.clear();

    const response = await axios.post(BASE_URL + "/login", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//취향
export async function preference(taste) {
  try {
    const response = await axios.post(BASE_URL + "/preference", taste);
    return response.data;
  } catch (error) {
    throw error;
  }
}
//로그아웃
export async function logout(setUser) {
  try {
    await axios.post(BASE_URL + "logout");
    await setUser(null);
  } catch (error) {
    throw error;
  }
}

export async function check() {
  try {
    const response = await axios.get(
      "https://api.silvstone.xyz/api/v1/cocktail?page=0&size=1&sort=string"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

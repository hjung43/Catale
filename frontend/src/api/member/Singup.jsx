import axios from "axios";
const BASE_URL = "https://api.silvstone.xyz/api/v1/member/";

// 일반 회원가입
export async function signup(user) {
  try {
    const response = await axios.post(BASE_URL + "signup", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 이메일 인증 요청
export async function checkEmail(email) {
  try {
    const response = await axios.get(BASE_URL + `email/${email}exists`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 닉네임 중복 검사
export async function checkNickName(nickname) {
  try {
    const response = await axios.get(BASE_URL + `nickname/${nickname}/exists`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//로그인도 여기있다잉
export async function login(user) {
  try {
    localStorage.clear();

    const response = await axios.post(BASE_URL + "login", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

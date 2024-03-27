import axios from "axios";
const BASE_URL = "https://api.silvstone.xyz/api/v1/member/profileimage";

export async function updateProfile(object) {
  try {
    const response = await axios.put(BASE_URL, object);
    return response.data;
  } catch (error) {
    throw error;
  }
}

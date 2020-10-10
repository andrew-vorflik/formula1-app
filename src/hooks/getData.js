import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url + ".json");
    return response;
  } catch (error) {
    return error;
  }
}

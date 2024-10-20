import axios from "axios";

class APIService {
  async get(url: string) {
    const responce = await axios.get(url);
    return responce.data;
  }
}

const apiService = new APIService();

export default apiService;

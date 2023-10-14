import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/prioritypilot/api"

class UserApi {
  // the token for interactive with the API will be stored here.
  static token;
  
  // method to request any API route, returns response data
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${UserApi.token}` };
    const params = (method === "get")
        ? data
        : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.msg;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Get the current user
  static async getCurrentUser(user_id) {
    let res = await this.request(`users/${user_id}`);
    return res;
  }

  // Signup for site, returns token, creates a new user in db.
  static async register(data) {
    let res = await this.request("users/signup", data, "post");
    return res.access_token;
  }

  // Login method, returns token 
  static async login(data) {
    let res = await this.request("users/login", data, "post");
    return res.access_token;
  }

  // Adds Project to DB
  static async addProject(data) {
    console.log(data)
    let res = await this.request("projects", data, "post");
    return res;
}
}

export default UserApi
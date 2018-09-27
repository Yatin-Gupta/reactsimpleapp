import http from "./httpService";
import { usersEndpoint, userAuthEndpoint } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "userToken";
const UserService = {
  getUsers: async () => {
    let response = await http.get(usersEndpoint);
    if (response.data) {
      return response.data;
    }
    return [];
  },
  getUser: async id => {
    let response = await http.get(usersEndpoint + "/" + id);
    if (response.data) {
      return response.data;
    }
    return {};
  },
  add: async user => {
    let response = await http.post(usersEndpoint, user);
    if (response.data) {
      if (response.headers["x-auth-token"] !== undefined) {
        localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
      }
      return response.data._id;
    }
    return -1;
  },
  update: async (id, user) => {
    await http.put(usersEndpoint + "/" + id, user);
  },
  getAuthToken: async validationData => {
    // JWT Token
    try {
      let response = await http.post(userAuthEndpoint, validationData);
      console.log(response);
      if (response.data) {
        localStorage.setItem(tokenKey, response.data);
        return response.data;
      }
    } catch (exception) {
      console.log(exception.response.data);
    }
  },
  getUserByAuthToken: () => {
    let token = localStorage.getItem(tokenKey);
    // Need to decode this token to get user data
    // for it install jwt-decode package
    let user = null;
    try {
      user = jwtDecode(token); // will fail if token not found(as for logged out user)
    } catch (exception) {}
    return user;
  },
  logout: () => {
    if (localStorage.getItem(tokenKey)) {
      localStorage.removeItem(tokenKey);
    }
  }
};

export default UserService;

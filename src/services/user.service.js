import http from "./httpService";
import { usersEndpoint, userAuthEndpoint } from "../config.json";

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
      return response.data._id;
    }
    return -1;
  },
  update: async (id, user) => {
    await http.put(usersEndpoint + "/" + id, user);
  },
  getAuthToken: async validationData => {
    try {
      let response = await http.post(userAuthEndpoint, validationData);
      console.log(response);
      if (response.data) {
        return response.data;
      }
    } catch (exception) {
      console.log(exception.response.data);
    }
  }
};

export default UserService;

import axios from "axios";
import { toast } from "react-toastify";
//import UserService from "./user.service";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error: ", error);
    toast.error("Unexpected Error occurs");
  }
  return Promise.reject(error);
});

const setJwt = jwt => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt
};

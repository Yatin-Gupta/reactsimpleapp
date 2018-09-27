import http from "./httpService";
import { movieEndpoint } from "../config.json";

const MovieService = {
  getMovies: async () => {
    let response = await http.get(movieEndpoint);
    if (response.data) {
      return response.data;
    }
    return [];
  },
  getMovie: async id => {
    let response = await http.get(movieEndpoint + "/" + id);
    if (response.data) {
      return response.data;
    }
    return {};
  },
  add: async movie => {
    let response = await http.post(movieEndpoint, movie);
    if (response.data) {
      return response.data._id;
    }
    return -1;
  },
  update: async (id, movie) => {
    await http.put(movieEndpoint + "/" + id, movie);
  }
};

export default MovieService;

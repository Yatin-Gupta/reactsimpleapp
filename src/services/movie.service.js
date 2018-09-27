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
    await http.post(movieEndpoint, movie);
  },
  update: async (id, movie) => {
    await http.put(movieEndpoint + "/" + id, movie);
  }
};

export default MovieService;

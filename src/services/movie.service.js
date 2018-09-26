import http from "./httpService";
import { movieEndpoint } from "../config.json";

const Movie = {
  getMovies: async () => {
    let response = await http.get(movieEndpoint);
    if (response.data) {
      return response.data;
    }
    return [];
  },
  getMovie: () => {
    console.log("Get Movie");
  },
  add: async movie => {
    await http.post(movieEndpoint, movie);
  }
};

export default Movie;

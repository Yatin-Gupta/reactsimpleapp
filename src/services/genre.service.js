import http from "./httpService";
import { genreEndpoint } from "../config.json";

const GenreService = {
  getGenres: async () => {
    let response = await http.get(genreEndpoint);
    if (response.data) {
      let result = [];
      response.data.forEach(function(data) {
        result.push(data.name);
      });
      return ["All", ...result];
    }
    return ["All"];
  },
  getGenresWithId: async () => {
    let response = await http.get(genreEndpoint);
    if (response.data) {
      return response.data;
    }
    return [];
  }
};

export default GenreService;

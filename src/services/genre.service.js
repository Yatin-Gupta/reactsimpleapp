import http from "./httpService";
import { genreEndpoint } from "../config.json";

const Genre = {
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
  getGenre: () => {
    console.log("Get Genre");
  }
};

export default Genre;

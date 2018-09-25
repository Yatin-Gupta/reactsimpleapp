import React, { Component } from "react";
import _ from "lodash";

class MovieForm extends Component {
  getMovieByName = (name, movies) => {
    let index = _.findIndex(movies, { title: name });
    return movies[index];
  };

  render() {
    let movieName = this.props.match.params.name;
    let movie = this.getMovieByName(movieName, this.props.movies);
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <div>Movie Id: {movie._id}</div>
        <div>Movie Title: {movie.title}</div>
        <div>Movie Genre: {movie.genre.name}</div>
        <button onClick={() => this.props.history.push("/movies")}>Save</button>
      </React.Fragment>
    );
  }
}

export default MovieForm;

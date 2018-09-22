import React, { Component } from "react";
import Movie from "./Movie";

class Movies extends Component {
  counter;

  constructor(props) {
    super(props);
    this.counter = 0;
  }

  getCounter() {
    ++this.counter;
    return this.counter;
  }

  render() {
    let pager = this.props.pager;
    this.counter =
      pager.selectedPage * pager.moviesPerPage - pager.moviesPerPage;
    return (
      <React.Fragment>
        {pager.paginatedMovies.map(movie => (
          <tr key={movie.title}>
            <Movie
              movie={movie}
              counter={this.getCounter()}
              onLike={this.props.onLike}
            />
          </tr>
        ))}
      </React.Fragment>
    );
  }
}

export default Movies;

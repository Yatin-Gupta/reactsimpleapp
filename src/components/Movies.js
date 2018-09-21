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
    return (
      <React.Fragment>
        {this.props.movies.map(movie => (
          <tr>
            <Movie movie={movie} counter={this.getCounter()} />
          </tr>
        ))}
      </React.Fragment>
    );
  }
}

export default Movies;

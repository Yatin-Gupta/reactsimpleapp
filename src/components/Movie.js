import React, { Component } from "react";

class Movie extends Component {
  render() {
    const { title, genre, numberInStock, dailyRentalRate } = this.props.movie;
    return (
      <React.Fragment>
        <th scope="row">{this.props.counter}</th>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td>
          <button>White</button>
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </React.Fragment>
    );
  }
}

export default Movie;

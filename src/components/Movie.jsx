import React, { Component } from "react";
import Like from "./common/Like";

class Movie extends Component {
  render() {
    const {
      _id,
      title,
      genre,
      numberInStock,
      dailyRentalRate,
      likestatus
    } = this.props.movie;
    return (
      <React.Fragment>
        <th scope="row">{this.props.counter}</th>
        <td>{title}</td>
        <td>{genre.name}</td>
        <td>{numberInStock}</td>
        <td>{dailyRentalRate}</td>
        <td onClick={() => this.props.onLike(_id)}>
          <Like status={likestatus} />
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </React.Fragment>
    );
  }
}

export default Movie;
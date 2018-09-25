import React, { Component } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import _ from "lodash";

class MovieForm extends Component {
  state = {
    account: {
      title: "",
      genre: "Thriller",
      noInStock: 0,
      rate: ""
    }
  };

  getMovieByName = (name, movies) => {
    let index = _.findIndex(movies, { title: name });
    return movies[index];
  };

  changeHandler() {
    console.log("change");
  }

  render() {
    //let movieName = this.props.match.params.name;
    //let movie = this.getMovieByName(movieName, this.props.movies);

    return (
      <React.Fragment>
        <h1>Movies Form</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Input
            label={"Title:"}
            id={"title"}
            placeholder={"Enter Title"}
            value={this.state.account.title}
            name={"title"}
            type={"text"}
            onChange={this.changeHandler}
            errors={"this.getErrorByField('title')"}
          />
          <Select
            genres={["Action", "Comedy", "Thriller"]}
            name="genre"
            id="genre"
            selectedGenre={this.state.account.genre}
          />
          <Input
            label={"Number in Stock:"}
            id={"nis"}
            placeholder={"Enter number in stock"}
            value={this.state.account.noInStock}
            name={"noInStock"}
            type={"text"}
            onChange={this.changeHandler}
            errors={"this.getErrorByField('noInStock')"}
          />
          <Input
            label={"Rate:"}
            id={"rate"}
            placeholder={"Enter Rate: "}
            value={this.state.account.rate}
            name={"rate"}
            type={"text"}
            onChange={this.changeHandler}
            errors={"this.getErrorByField('rate')"}
          />
        </form>
        {/* <h1>Movie Form</h1>
        <div>Movie Id: {movie._id}</div>
        <div>Movie Title: {movie.title}</div>
        <div>Movie Genre: {movie.genre.name}</div>
        <button onClick={() => this.props.history.push("/movies")}>Save</button> */}
      </React.Fragment>
    );
  }
}

export default MovieForm;

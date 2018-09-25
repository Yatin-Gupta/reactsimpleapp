import React, { Component } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import _ from "lodash";
import Form from "./common/Form";
import Joi from "joi-browser";

class MovieForm extends Component {
  state = {
    account: {
      title: "",
      genre: "Thriller",
      noInStock: 0,
      rate: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .min(5)
      .max(30)
      .required()
      .label("Title"),
    genre: Joi.string()
      .valid("Action", "Comedy", "Thriller")
      .required()
      .label("Genre"),
    noInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .required()
      .label("Rate")
  };

  getMovieByName = (name, movies) => {
    let index = _.findIndex(movies, { title: name });
    return movies[index];
  };

  changeHandler = e => {
    let { account } = this.state;
    let { name: targetName, value: targetValue } = e.currentTarget;
    account[targetName] = targetValue;
    let errors = {};
    let schema = {
      [targetName]: this.schema[targetName]
    };
    let formFieldError = Form.validateField(
      { [targetName]: targetValue },
      schema
    );
    errors[formFieldError.key] = formFieldError.value;
    this.setState({ account, errors }); // stands for ({account:account})
  };

  submitHandler = e => {
    e.preventDefault();
    //console.log(this.username.current.value); //this.username.current got reference for HTML Input element
    const formErrors = Form.validateAllFields(this.state.account, this.schema);
    let errors = {};
    formErrors.forEach(function(error) {
      errors[error.key] = error.value;
    });
    this.setState({ errors });
    if (errors.length === 0) {
      <Redirect
        to={{
          pathname: "/get-movies",
          movie: { ...this.state.account }
        }}
      />;
    }
    // call to server made
  };

  getErrorByField = field => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };

  getButton(label) {
    if (Form.validateAllFields(this.state.account, this.schema).length > 0) {
      return (
        <button type="submit" className="btn btn-default" disabled>
          {label}
        </button>
      );
    } else {
      return (
        <button type="submit" className="btn btn-default">
          {label}
        </button>
      );
    }
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
            errors={this.getErrorByField("title")}
          />
          <Select
            genres={["Action", "Comedy", "Thriller"]}
            name="genre"
            id="genre"
            defaultValue={this.state.account.genre}
            errors={this.getErrorByField("genre")}
            label="Select Genre:"
            onChange={this.changeHandler}
          />
          <Input
            label={"Number in Stock:"}
            id={"nis"}
            placeholder={"Enter number in stock"}
            value={this.state.account.noInStock}
            name={"noInStock"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("noInStock")}
          />
          <Input
            label={"Rate:"}
            id={"rate"}
            placeholder={"Enter Rate: "}
            value={this.state.account.rate}
            name={"rate"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("rate")}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {this.getButton("Add Movie")}
            </div>
          </div>
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

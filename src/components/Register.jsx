import React, { Component } from "react";
import Input from "./common/Input";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./common/Form";

class Register extends Component {
  state = {
    account: {
      username: "",
      password: "",
      name: ""
    }
  };
  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(4)
      .required()
      .label("Password"),
    name: Joi.string()
      .min(5)
      .max(30)
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

    if (_.isEmpty(errors)) {
      this.props.addUser(this.state.account);
      //this.props.history.push("/movies");
    }
    // call to server made

    window.location = "/";
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
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Input
            label={"Username:"}
            id={"username"}
            placeholder={"Enter Username"}
            value={this.state.account.username}
            name={"username"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("username")}
          />
          <Input
            label={"Password:"}
            id={"password"}
            placeholder={"Enter Password"}
            value={this.state.account.password}
            name={"password"}
            type={"password"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("password")}
          />
          <Input
            label={"Name:"}
            id={"name"}
            placeholder={"Enter Name"}
            value={this.state.account.name}
            name={"name"}
            type={"text"}
            onChange={this.changeHandler}
            errors={this.getErrorByField("name")}
          />
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              {this.getButton("Register")}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Register;

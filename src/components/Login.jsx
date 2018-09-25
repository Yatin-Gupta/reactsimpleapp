import React, { Component } from "react";
import Input from "./common/Input";
import checks from "./common/validations";
import _ from "lodash";

class Login extends Component {
  //username = React.createRef(); //Ref use must be avoided. They should be used only when you require reference to HTML element and left with no other way as they make unit testing difficult

  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  /*componentDidMount() {
    this.username.current.focus();
  } to focus on username as component mounted. same can be acheived by autoFocus on input element*/

  validationHandler = () => {
    const { username, password } = this.state.account;
    const { errors } = this.state;
    if (checks.isEmpty(username)) {
      errors["username"] = "Username cannot be empty!!";
    } else {
      errors["username"] = "";
    }
    if (checks.isEmpty(password)) {
      errors["password"] = "Password cannot be empty!!";
    } else {
      errors["password"] = "";
    }
    return errors;
  };

  submitHandler = e => {
    e.preventDefault();
    //console.log(this.username.current.value); //this.username.current got reference for HTML Input element
    const errors = this.validationHandler();
    if (Object.keys(this.state.errors).length > 0) {
      this.setState({ errors });
      return;
    }
    // call to server made
  };
  validatePropertyHandler = (name, value) => {
    if (name === "username") {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase()))
        return "Please enter correct email";
    } else if (name === "password") {
      if (value.length < 4) {
        return "Password length must be greater than 4";
      }
    }
    return "";
  };
  changeHandler = e => {
    let { account, errors } = this.state;
    account[e.currentTarget.name] = e.currentTarget.value;
    let errmsg = this.validatePropertyHandler(
      e.currentTarget.name,
      e.currentTarget.value
    );
    errors[e.currentTarget.name] = errmsg;
    console.log(this.state);
    this.setState({ account, errors }); // stands for ({account:account})
  };
  getErrorByField = field => {
    if (_.isEmpty(this.state.errors) || this.state.errors[field] === undefined)
      return "";
    return this.state.errors[field];
  };
  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className="form-horizontal" onSubmit={this.submitHandler}>
          <Input
            label={"Email:"}
            id={"email"}
            placeholder={"Enter username/email"}
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
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;

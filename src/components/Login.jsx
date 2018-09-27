import React, { Component } from "react";
import Input from "./common/Input";
import checks from "./common/validations";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./common/Form";

class Login extends Component {
  //username = React.createRef(); //Ref use must be avoided. They should be used only when you require reference to HTML element and left with no other way as they make unit testing difficult

  formErrorStatus = false;

  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .min(4)
      .required()
      .label("Password")
  };

  /*componentDidMount() {
    this.username.current.focus();
  } to focus on username as component mounted. same can be acheived by autoFocus on input element*/

  //   validationHandler = () => {
  //     const { errors } = this.state;
  //     let result = Joi.validate(this.state.account, this.schema, {
  //       abortEarly: false
  //     });
  //     if (result.error) {
  //       result.error.details.forEach(detail => {
  //         errors[detail.context.key] = detail.message;
  //       });
  //       return errors;
  //     }
  //     return {};
  //     // console.log(result);
  //     // const { username, password } = this.state.account;
  //     // if (checks.isEmpty(username)) {
  //     //   errors["username"] = "Username cannot be empty!!";
  //     // } else {
  //     //   errors["username"] = "";
  //     // }
  //     // if (checks.isEmpty(password)) {
  //     //   errors["password"] = "Password cannot be empty!!";
  //     // } else {
  //     //   errors["password"] = "";
  //     // }
  //     // return errors;
  //   };

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
      this.props.loginUser(this.state.account);
      this.props.history.push("/movies");
    }
    // call to server made
  };
  //   validatePropertyHandler = (name, value) => {
  //     let schema = {
  //       [name]: this.schema[name]
  //     };
  //     let obj = { [name]: value };
  //     let result = Joi.validate(obj, schema, { abortEarly: true });
  //     console.log(result);
  //     if (result.error) {
  //       return result.error.details[0].message;
  //     }
  //     // if (name === "username") {
  //     //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     //   if (!re.test(String(value).toLowerCase()))
  //     //     return "Please enter correct email";
  //     // } else if (name === "password") {
  //     //   if (value.length < 4) {
  //     //     return "Password length must be greater than 4";
  //     //   }
  //     // }
  //     return "";
  //   };
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
              {this.getButton("Login")}
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;

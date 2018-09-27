import React, { Component } from "react";

class Logout extends Component {
  state = {};
  componentDidMount() {
    this.props.logoutUser();
    window.location = "/movies";
  }
  render() {
    return null;
  }
}

export default Logout;

import React, { Component } from "react";

class Like extends Component {
  renderLike(status) {
    let heartClass = status ? "fa-heart" : "fa-heart-o";
    return heartClass;
  }
  render() {
    return (
      <i
        className={"fa " + this.renderLike(this.props.status)}
        aria-hidden="true"
      />
    );
  }
}

export default Like;

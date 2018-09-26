import React, { Component } from "react";
import Input from "./Input";

class Search extends Component {
  changeHandler = e => {
    this.props.onSearch(e.currentTarget.value);
  };

  render() {
    return (
      <React.Fragment>
        <Input placeholder="Search By Title..." onChange={this.changeHandler} />
      </React.Fragment>
    );
  }
}

export default Search;

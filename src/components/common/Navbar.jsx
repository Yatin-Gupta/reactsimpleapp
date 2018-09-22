import React, { Component } from "react";
import Genre from "./Genre";

class Navbar extends Component {
  renderNavigationBar(moviesCount) {
    if (moviesCount === 0) {
      return <p>There is no movies in database.</p>;
    }
    return <p>There are {moviesCount} movies in total</p>;
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          {this.renderNavigationBar(this.props.totalMovies)}
          <Genre genre={this.props.genre} onGenre={this.props.onGenre} />
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;

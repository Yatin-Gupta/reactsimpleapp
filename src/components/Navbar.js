import React, { Component } from "react";

class Navbar extends Component {
  renderNavigationBar(moviesCount) {
    if (moviesCount === 0) {
      return <p>There is no movies in database.</p>;
    }
    return <p>There are movies</p>;
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          {this.renderNavigationBar(this.props.movies.length)}
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;

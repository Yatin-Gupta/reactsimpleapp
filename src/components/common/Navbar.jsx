import React, { Component } from "react";

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Yatin
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/movies">
                  Movies
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/customers">
                  Customers
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/rentals">
                  Rentals
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <nav classNameName="navbar navbar-light bg-light">
          {this.renderNavigationBar(this.props.totalMovies)}
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;

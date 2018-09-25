import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

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
          <Link className="navbar-brand" to="/">
            Yatin
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/movies">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/customers">
                  Customers
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/rentals">
                  Rentals
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div>&nbsp;</div>
      </React.Fragment>
    );
  }
}

export default Navbar;

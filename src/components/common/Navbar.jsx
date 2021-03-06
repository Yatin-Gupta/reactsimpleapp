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
            {this.props.user ? this.props.user.name : "NoUser"}
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
              {this.props.user === null ? (
                <React.Fragment>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
        <div>&nbsp;</div>
      </React.Fragment>
    );
  }
}

export default Navbar;

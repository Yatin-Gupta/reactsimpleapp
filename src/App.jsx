import React, { Component } from "react";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Pagination from "./components/common/Pagination";
import _ from "lodash";

class App extends Component {
  state = {
    movies: [
      {
        _id: "5b21ca3eeb7f6fbccd471815",
        title: "Terminator",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: "2018-01-03T19:04:28.809Z",
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd471816",
        title: "Die Hard",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        numberInStock: 5,
        dailyRentalRate: 2.5,
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd471817",
        title: "Get Out",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
        numberInStock: 8,
        dailyRentalRate: 3.5,
        likestatus: 1
      },
      {
        _id: "5b21ca3eeb7f6fbccd471819",
        title: "Trip to Italy",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        likestatus: 1
      },
      {
        _id: "5b21ca3eeb7f6fbccd47181a",
        title: "Airplane",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd47181b",
        title: "Wedding Crashers",
        genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd47181e",
        title: "Gone Girl",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
        numberInStock: 7,
        dailyRentalRate: 4.5,
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd47181f",
        title: "The Sixth Sense",
        genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
        numberInStock: 4,
        dailyRentalRate: 3.5,
        likestatus: 0
      },
      {
        _id: "5b21ca3eeb7f6fbccd471821",
        title: "The Avengers",
        genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        numberInStock: 7,
        dailyRentalRate: 3.5,
        likestatus: 0
      }
    ],
    pager: {
      moviesPerPage: 8,
      paginatedMovies: [],
      noOfPages: 1,
      selectedPage: 1
    }
  };

  constructor() {
    super();
    this.state.pager.paginatedMovies = this.state.movies.slice(
      0,
      this.state.pager.moviesPerPage
    );
    //console.log(this.state.pager.paginatedMovies[0] === this.state.movies[0]);true;//this adds
    // advantage that if paginatedMovies object is changed then movies object also get changed
    // automatically.
    this.state.pager.noOfPages = Math.ceil(
      this.state.movies.length / this.state.pager.moviesPerPage
    );
  }

  renderAppBody() {
    let countMovies = this.state.pager.paginatedMovies.length;
    if (countMovies === 0) {
      return;
    }
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col">&nbsp;</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <Movies pager={this.state.pager} onLike={this.likeHandler} />
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  likeHandler = id => {
    let changedMovies = this.state.pager.paginatedMovies.map(movie => {
      if (movie._id === id) {
        movie.likestatus = movie.likestatus === 1 ? 0 : 1;
      }
      return movie;
    });
    let newPager = this.state.pager;
    newPager.paginatedMovies = changedMovies;
    this.setState({ pager: newPager });
  };

  pageHandler = pageCount => {
    let startIndex =
      pageCount * this.state.pager.moviesPerPage -
      this.state.pager.moviesPerPage;
    let endIndex = startIndex + this.state.pager.moviesPerPage; // here -1 is not done as slice not allow it
    console.log(this.state.movies);
    console.log(this.state.paginatedMovies);
    let newPager = this.state.pager;
    newPager.paginatedMovies = this.state.movies.slice(startIndex, endIndex);
    newPager.selectedPage = pageCount;
    this.setState({
      pager: newPager
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar movies={this.state.pager.paginatedMovies} />
          {this.renderAppBody()}
          <Pagination
            pager={_.omit(this.state.pager, "paginatedMovies")}
            onPage={this.pageHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

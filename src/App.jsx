import React, { Component } from "react";
import Movies from "./components/Movies";
import Navbar from "./components/common/Navbar";
import Pagination from "./components/common/Pagination";
import { getMovies } from "./services/movies.service";
import { getGenres } from "./services/genres.service";
import _ from "lodash";
import TableHeader from "./components/TableHeader";

class App extends Component {
  state = {
    movies: getMovies(),
    pager: {
      moviesPerPage: 2,
      paginatedMovies: [],
      noOfPages: 1,
      selectedPage: 1
    },
    genre: {
      selectedGenre: "All",
      genres: getGenres()
    },
    sorter: {
      fields: [
        { name: "title", order: "no" },
        { name: "genre", order: "no" },
        { name: "numberInStock", order: "no" },
        { name: "dailyRentalRate", order: "no" }
      ],
      activeField: "title"
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

  toggleHandler = header => {
    let newFields = this.state.sorter.fields.map(field => {
      if (field.name === header) {
        if (field.order === "no") {
          field.order = "asc";
        } else {
          field.order = field.order === "asc" ? "desc" : "asc";
        }
        this.state.sorter.activeField = field.name;
      } else {
        field.order = "no";
      }
      return field;
    });
    this.state.sorter.fields = newFields;
    this.setState({ sorter: this.state.sorter });
    this.pageHandler(this.state.pager.selectedPage);
  };

  renderAppBody() {
    let countMovies = this.state.pager.paginatedMovies.length;
    if (countMovies === 0) {
      return;
    }
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <TableHeader
              sorter={this.state.sorter}
              onToggle={this.toggleHandler}
            />
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
    let newPager = this.state.pager;
    let filteredMovies = this.state.movies;
    if (this.state.genre.selectedGenre !== "All") {
      filteredMovies = this.state.movies.filter(movie => {
        if (movie.genre.name === this.state.genre.selectedGenre) return movie;
      });
    }
    let sortField = _.find(
      this.state.sorter.fields,
      "name",
      this.state.sorter.activeField
    );
    console.log(this.state.sorter.activeField);
    let sortedFilteredMovies = filteredMovies;
    if (sortField.order != "no") {
      let tempFilteredMovies = filteredMovies.map(movie => {
        if (sortField.name === "genre") {
          movie["sortField"] = ("" + movie[sortField.name].name).toLowerCase();
          return movie;
        }
        movie["sortField"] = ("" + movie[sortField.name]).toLowerCase();
        return movie;
      });
      let sortedTempFilteredMovies = _.orderBy(
        tempFilteredMovies,
        "sortField",
        sortField.order
      );
      sortedFilteredMovies = sortedTempFilteredMovies.map(movie => {
        return _.omit(movie, "sortField");
      });
    }
    console.log(sortedFilteredMovies);
    let noOfPages = Math.ceil(
      sortedFilteredMovies.length / this.state.pager.moviesPerPage
    );
    console.log("startIndex: ", startIndex);
    console.log("endIndex: ", endIndex);
    newPager.paginatedMovies = sortedFilteredMovies.slice(startIndex, endIndex);
    newPager.selectedPage = pageCount;
    newPager.noOfPages = noOfPages;
    this.setState({
      pager: newPager
    });
  };

  genreHandler = genre => {
    let newGenre = this.state.genre;
    newGenre.selectedGenre = genre;
    this.setState({ genre: newGenre });
    let newPager = this.state.pager;
    newPager.selectedPage = 1;
    this.setState({ pager: newPager });
    this.pageHandler(this.state.pager.selectedPage);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar
            totalMovies={this.state.movies.length}
            genre={this.state.genre}
            onGenre={this.genreHandler}
          />
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

import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Pagination from "./components/common/Pagination";
import { getMovies } from "./services/movies.service";
import { getGenres } from "./services/genres.service";
import _ from "lodash";
import paginate from "./utils/paginate";
import sortData from "./utils/sort";
import Body from "./components/Body";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieForm from "./components/MovieForm";

class App extends Component {
  movies = [];
  state = {
    renderMovies: [],
    genre: {
      selectedGenre: "All",
      genres: getGenres()
    }
  };

  sorter = {
    fields: [
      { name: "title", label: "Title", order: "no" },
      { name: "genre", label: "Genre", order: "no" },
      { name: "numberInStock", label: "Stock", order: "no" },
      { name: "dailyRentalRate", label: "Rate", order: "no" }
    ],
    activeField: "title"
  };

  pager = {
    moviesPerPage: 4,
    noOfPages: 1,
    selectedPage: 1
  };

  constructor() {
    super();
    this.movies = getMovies();
    this.state.renderMovies = this.movies.slice(0, this.pager.moviesPerPage);
    //console.log(this.state.pager.paginatedMovies[0] === this.state.movies[0]);true;//this adds
    // advantage that if paginatedMovies object is changed then movies object also get changed
    // automatically.
    this.pager.noOfPages = Math.ceil(
      this.movies.length / this.pager.moviesPerPage
    );
  }

  toggleHandler = clickedHead => {
    let newFields = this.sorter.fields.map(field => {
      if (field.name === clickedHead) {
        if (field.order === "no") {
          field.order = "asc";
        } else {
          field.order = field.order === "asc" ? "desc" : "asc";
        }
        this.sorter.activeField = field.name;
      } else {
        field.order = "no";
      }
      return field;
    });
    this.sorter.fields = newFields;

    this.pageHandler(this.pager.selectedPage);
  };

  likeHandler = id => {
    let index = _.findIndex(this.movies, { _id: id });
    this.movies[index]["likestatus"] =
      this.movies[index]["likestatus"] === 1 ? 0 : 1;
    //let newPager = this.state.pager;
    //newPager.paginatedMovies = changedMovies;
    this.pageHandler(this.pager.selectedPage);
  };

  pageHandler = pageCount => {
    const thisState = this.state;
    let filteredMovies = this.movies;
    if (thisState.genre.selectedGenre !== "All") {
      filteredMovies = this.movies.filter(movie => {
        if (movie.genre.name === this.state.genre.selectedGenre) return movie;
      });
    }
    let sortedFilteredMovies = sortData(filteredMovies, this.sorter, {
      genre: "name"
    });
    let resultPager = paginate(
      sortedFilteredMovies.length,
      pageCount,
      this.pager.moviesPerPage
    );
    this.pager.selectedPage = pageCount;
    this.pager.noOfPages = resultPager.noOfPages;

    this.setState({
      renderMovies: sortedFilteredMovies.slice(
        resultPager.startIndex,
        resultPager.endIndex
      )
    });
  };

  genreHandler = genre => {
    let newGenre = this.state.genre;
    newGenre.selectedGenre = genre;
    this.setState({ genre: newGenre });
    this.pager.selectedPage = 1;
    this.pageHandler(this.pager.selectedPage);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Navbar totalMovies={this.movies.length} />
          <Switch>
            <Route
              path="/movies"
              render={props => (
                <React.Fragment>
                  <Body
                    renderMovies={this.state.renderMovies}
                    genre={this.state.genre}
                    onGenre={this.genreHandler}
                    sorter={this.sorter}
                    pager={this.pager}
                    onLike={this.likeHandler}
                    onToggle={this.toggleHandler}
                    {...props}
                  />
                  <Pagination pager={this.pager} onPage={this.pageHandler} />
                </React.Fragment>
              )}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route
              path="/movie/:name"
              render={props => <MovieForm movies={this.movies} {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

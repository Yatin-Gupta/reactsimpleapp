import React, { Component } from "react";
import Navbar from "./components/common/Navbar";
import Pagination from "./components/common/Pagination";
import MovieService from "./services/movie.service";
import GenreService from "./services/genre.service";
import _ from "lodash";
import paginate from "./utils/paginate";
import sortData from "./utils/sort";
import Body from "./components/Body";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import { Route, Redirect, Switch } from "react-router-dom";
import MovieForm from "./components/MovieForm";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import UserService from "./services/user.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  movies = [];
  state = {
    renderMovies: []
  };

  genre = {
    selectedGenre: "All",
    genres: []
  };

  searchString = "";

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

  async componentDidMount() {
    this.movies = await MovieService.getMovies();
    this.genre.genres = await GenreService.getGenres();
    this.pageHandler(this.pager.selectedPage);
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

  pageHandler = (pageCount = 1) => {
    const thisState = this.state;
    let actualMovies = [];
    console.log("Page handler");
    //console.log(this.movies);
    if (this.searchString.trim() === "") {
      actualMovies = this.movies;
    } else {
      actualMovies = this.movies.filter(movie => {
        return movie.title.indexOf(this.searchString) > -1;
      });
    }
    let filteredMovies = actualMovies;
    if (this.genre.selectedGenre !== "All") {
      filteredMovies = filteredMovies.filter(movie => {
        if (movie.genre.name === this.genre.selectedGenre) return movie;
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
    this.genre.selectedGenre = genre;
    this.pager.selectedPage = 1;
    this.pageHandler(this.pager.selectedPage);
  };

  addMovieHandler = async movie => {
    let saveMovie = {};
    //saveMovie._id = Date.now().toString();
    saveMovie.title = movie.title;
    saveMovie.numberInStock = movie.noInStock;
    saveMovie.dailyRentalRate = movie.rate;
    for (let i = 0; i < this.movies.length; ++i) {
      if (this.movies[i].genre.name === movie.genre) {
        saveMovie.genre = this.movies[i].genre;
        break;
      }
    }
    //setTimeout(async () => {
    let passMovie = { ...saveMovie };
    passMovie.genreId = passMovie.genre._id;
    delete passMovie.genre;
    let response = await MovieService.add(passMovie);
    if (response !== -1) {
      saveMovie._id = response;
      this.movies.push(saveMovie);
      this.pageHandler(this.pager.selectedPage);
    }
    //}, 0);
  };

  getMovieHandler = async movieId => {
    let response = await MovieService.getMovie(movieId);
    if (response) {
      return response;
    }
    return {};
  };

  getGenresHandler = async () => {
    let response = await GenreService.getGenres();
    if (response) {
      return response.slice(1);
    }
    return [];
  };

  editHandler = async movie => {
    let saveMovie = await MovieService.getMovie(movie.id);
    if (!_.isEmpty(saveMovie)) {
      saveMovie.title = movie.title;
      saveMovie.numberInStock = movie.noInStock;
      saveMovie.dailyRentalRate = movie.rate;
      let genres = await GenreService.getGenresWithId();
      for (let i = 0; i < genres.length; ++i) {
        if (genres[i].name === movie.genre) {
          saveMovie["genre"] = genres[i];
          break;
        }
      }
      for (let i = 0; i < this.movies.length; ++i) {
        if (this.movies[i]._id === saveMovie._id) {
          this.movies[i] = { ...saveMovie };
          break;
        }
      }
      this.pageHandler(this.pager.selectedPage);
      console.log(this.movies);
      setTimeout(async () => {
        saveMovie.genreId = saveMovie.genre._id;
        let id = saveMovie._id;
        delete saveMovie._id;
        delete saveMovie.genre;
        await MovieService.update(id, saveMovie);
      }, 0);
    }
  };

  searchHandler = searchString => {
    this.searchString = searchString;
    this.pageHandler();
  };

  addUserHandler = async user => {
    let saveUser = {};
    saveUser["email"] = user["username"];
    saveUser["password"] = user["password"];
    saveUser["name"] = user["name"];
    let response = await UserService.add(saveUser);
    if (response !== -1) {
      console.log("New User Id: ", response);
    } else {
      console.log("Unable to add User");
    }
  };

  loginHandler = async user => {
    let saveUser = {};
    saveUser["email"] = user["username"];
    saveUser["password"] = user["password"];
    let response = await UserService.getAuthToken(saveUser);
    if (response !== -1) {
      console.log("Logged In");
    } else {
      console.log("Unable to get web token");
    }
  };

  logoutHandler = () => {
    UserService.logout();
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container">
          <Navbar
            totalMovies={this.movies.length}
            user={UserService.getUserByAuthToken()}
          />
          <Switch>
            <Route
              path="/movies/new"
              render={props => (
                <MovieForm
                  {...props}
                  onAdd={this.addMovieHandler}
                  onGenres={this.getGenresHandler}
                />
              )}
            />
            <Route
              path="/movies"
              render={props => (
                <React.Fragment>
                  <Body
                    renderMovies={this.state.renderMovies}
                    genre={this.genre}
                    onGenre={this.genreHandler}
                    sorter={this.sorter}
                    pager={this.pager}
                    onLike={this.likeHandler}
                    onToggle={this.toggleHandler}
                    onSearch={this.searchHandler}
                    {...props}
                  />
                  <Pagination pager={this.pager} onPage={this.pageHandler} />
                </React.Fragment>
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loginUser={this.loginHandler} />
              )}
            />
            <Route
              path="/logout"
              render={props => (
                <Logout {...props} logoutUser={this.logoutHandler} />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register {...props} addUser={this.addUserHandler} />
              )}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route
              path="/movie/:id"
              exact
              render={props => (
                <MovieForm
                  onGet={this.getMovieHandler}
                  onEdit={this.editHandler}
                  onGenres={this.getGenresHandler}
                  {...props}
                />
              )}
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

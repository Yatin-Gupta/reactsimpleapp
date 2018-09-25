import React, { Component } from "react";
import Genre from "./common/Genre";
import TableHeader from "./TableHeader";
import Movies from "./Movies";

class Body extends Component {
  render() {
    let countMovies = this.props.renderMovies.length;
    if (countMovies === 0) {
      return;
    }
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <Genre genre={this.props.genre} onGenre={this.props.onGenre} />
          </div>
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/movies/new")}
            >
              New
            </button>
            <table className="table">
              <thead>
                <TableHeader
                  sorter={this.props.sorter}
                  onToggle={this.props.onToggle}
                />
              </thead>
              <tbody>
                <Movies
                  pager={this.props.pager}
                  onLike={this.props.onLike}
                  movies={this.props.renderMovies}
                />
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Body;

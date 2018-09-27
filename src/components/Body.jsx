import React, { Component } from "react";
import Genre from "./common/Genre";
import TableHeader from "./TableHeader";
import Movies from "./Movies";
import Search from "./common/Search";

class Body extends Component {
  renderTable = () => {
    if (this.props.renderMovies.length > 0) {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <thead>
            <TableHeader
              sorter={this.props.sorter}
              onToggle={this.props.onToggle}
            />
          </thead>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <Genre genre={this.props.genre} onGenre={this.props.onGenre} />
          </div>
          <div className="col">
            <Search onSearch={this.props.onSearch} />
            {this.props.user !== null ? (
              <React.Fragment>
                <button
                  className="btn btn-primary"
                  onClick={() => this.props.history.push("/movies/new")}
                >
                  New
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
            <table className="table">{this.renderTable()}</table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Body;

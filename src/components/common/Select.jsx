import React, { Component } from "react";

class Select extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={this.props.id} className="control-label col-sm-2">
            Select list:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id={this.props.id}
              name={this.props.name}
              defaultValue={this.props.selectedGenre}
            >
              {this.props.genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Select;

import React, { Component } from "react";

class Select extends Component {
  state = {};
  renderErrors = errors => {
    if (errors === "") return;
    return <div className="text-danger">{errors}</div>;
  };
  render() {
    const { label, id, onChange, defaultValue, name, errors } = this.props;
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor={id} className="control-label col-sm-2">
            {label}
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id={this.props.id}
              name={name}
              defaultValue={defaultValue}
              onChange={onChange}
            >
              {this.props.genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {this.renderErrors(errors)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Select;

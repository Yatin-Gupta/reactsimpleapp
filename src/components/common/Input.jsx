import React, { Component } from "react";

class Input extends Component {
  state = {};
  renderErrors = errors => {
    if (errors === "") return;
    return <div className="text-danger">{errors}</div>;
  };
  render() {
    const {
      label,
      id,
      placeholder,
      onChange,
      value,
      name,
      type,
      errors
    } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor={id}>
            {label}
          </label>
          <div className="col-sm-10">
            <input
              type={type}
              className="form-control"
              name={name}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              //ref={this.username}
            />
            {this.renderErrors(errors)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Input;

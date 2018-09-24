import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    const { fields } = this.props.sorter;
    return (
      <React.Fragment>
        <tr>
          <th scope="col">#</th>
          {fields.map(field => (
            <th
              scope="col"
              key={field.name}
              onClick={() => this.props.onToggle(field.name)}
            >
              {field.label}
            </th>
          ))}
          <th scope="col">&nbsp;</th>
          <th scope="col">&nbsp;</th>
        </tr>
      </React.Fragment>
    );
  }
}

export default TableHeader;

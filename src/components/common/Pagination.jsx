import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { noOfPages, selectedPage } = this.props.pager;
    if (noOfPages === 1) {
      return null;
    }
    let pageRange = _.range(1, noOfPages + 1, 1);
    return (
      <React.Fragment>
        <nav aria-label="...">
          <ul className="pagination">
            {pageRange.map(page => (
              <li
                className={
                  page === selectedPage ? "page-item active" : "page-item"
                }
                key={page}
              >
                <a
                  className="page-link"
                  onClick={() => this.props.onPage(page)}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

Pagination.propTypes = {
  pager: PropTypes.shape({
    noOfPages: PropTypes.number.isRequired,
    selectedPage: PropTypes.number.isRequired,
    moviesPerPage: PropTypes.number
  }),
  onPage: PropTypes.func.isRequired
};

export default Pagination;

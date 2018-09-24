import React, { Component } from "react";
import PropType from "prop-types";

class Genre extends Component {
  setFilterField(filterType) {
    console.log(filterType);
  }
  render() {
    const { genres, selectedGenre } = this.props.genre;
    return (
      <React.Fragment>
        <ul class="list-group">
          {genres.map(genre => (
            <li
              key={genre}
              onClick={() => this.props.onGenre(genre)}
              className={
                selectedGenre === genre
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {genre}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

Genre.propTypes = {
  genre: PropType.shape({
    genres: PropType.arrayOf(PropType.string).isRequired,
    selectedGenre: PropType.string.isRequired
  }),
  onGenre: PropType.func.isRequired
};

export default Genre;

import React, { Component } from "react";
import PropType from "prop-types";

class Genre extends Component {
  setFilterField(filterType) {
    console.log(filterType);
  }
  render() {
    const { genres, selectedGenre } = this.props.genre;
    return (
      <div>
        {genres.map(genre => (
          <button
            className={
              selectedGenre === genre
                ? "btn btn-primary m-2"
                : "btn btn-default m-2"
            }
            key={genre}
            onClick={() => this.props.onGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
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

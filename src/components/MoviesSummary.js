import React from 'react';
import { connect } from 'react-redux';
import selectMovies from '../selectors/selectMovies';

export const MoviesSummary = ({ movieCount, movieTotalCount }) => {
  const movieWord = movieCount === 1 ? 'movie' : 'movies';

  return (
    <div className="page-header_custom">
      <div className="content-container">
        <h1 className="page-header_custom__title">Viewing <span>{movieCount}</span> {movieWord} out of <span>{movieTotalCount}</span></h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleMovies = selectMovies(state.movies, state.filters);

  return {
    movieCount: visibleMovies.length,
    movieTotalCount: state.movies.length
  };
};

export default connect(mapStateToProps)(MoviesSummary);

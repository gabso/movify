import React from 'react';
import MoviesSummary from './MoviesSummary';
import MovieListFilter from './MovieListFilter';
import MovieList from './MovieList';


const MoviesPage = () => (
  <div>
    <MoviesSummary/>
    <MovieListFilter/>
    <MovieList/>
  </div>
);

export default MoviesPage;

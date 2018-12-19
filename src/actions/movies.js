import uuid from 'uuid';
import database from '../firebase/firebase';
import axios from 'axios';
import moment from 'moment';


// ADD_MOVIE
export const addMovie = (movie) => ({
  type: 'ADD_MOVIE',
  movie
});

const getMovieDetails = ( movieName ) => {

  return axios.get(`http://localhost:3000/ismovieexists/?contentName=${movieName}`);
};

export const startAddMovie = (movieName) => {
  return (dispatch, getState) => {


    return getMovieDetails(movieName).then( (res) => {

      const uid = getState().auth.uid;


      if (res.data === ''){
        return {error: 'No movie found!'};
      }

      const movie = {
        movieUid :res.data.id,
        movieName : res.data.title,
      genre : '',
      year: res.data.release_date == '' ? 'Unknown' : moment(res.data.release_date,'YYYY-MM-DD').year(),
      posterURL :`https://image.tmdb.org/t/p/w185${res.data.poster_path}`
    };


    return database.ref(`users/${uid}/movies`).push(movie).then((ref) => {
      dispatch(addMovie({
        id: ref.key,
        ...movie
      }));
    });
  });
  };
};

// REMOVE_MOVIE
export const removeMovie = ({ id } = {}) => ({
  type: 'REMOVE_MOVIE',
  id
});

export const startRemoveMovie = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movies/${id}`).remove().then(() => {
      dispatch(removeMovie({ id }));
    });
  };
};

// SET_MOVIES
export const setMovies = (movies) => ({
  type: 'SET_MOVIES',
  movies
});

export const startSetMovies = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/movies`).once('value').then((snapshot) => {
      const movies = [];

      snapshot.forEach((childSnapshot) => {
        movies.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setMovies(movies));
    });
  };
};

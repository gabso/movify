import React from 'react';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem';
import selectMovies from '../selectors/selectMovies';
import { Link } from 'react-router-dom';
import {startAddMovie} from '../actions/movies';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


export class MovieList extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          movieName: '',
          movieNameSuggestions: []
        };
      }


      onSuggestionsFetchRequested = async ({ value }) => {

        let res =  await axios.get(`http://localhost:3000/?contentName=${value}`);
        this.setState({
            movieNameSuggestions: res.data
        });
      };




      onSuggestionsClearRequested = () => {
        this.setState({
            movieNameSuggestions: []
        });
      };

      onMovieNameChange = (event, { newValue, method }) => {
        this.setState(() => (
            {
                 movieName : newValue 
            }));
      };

       renderSuggestion(suggestion) {
        return (
          <span>{suggestion.title}</span>
        );
      }

      
 getSuggestionValue(suggestion) {
    return suggestion.title;
  }
      

    onAdd(movieName){
       this.props.startAddMovie(
           {movieName,
            posterURL: 'https://image.tmdb.org/t/p/w92/eQs5hh9rxrk1m4xHsIz1w11Ngqb.jpg'
        });
    }


    renderMovieAutoSuggest(){

        const { movieName, movieNameSuggestions } = this.state;

        const inputProps = {
            placeholder: "Add movie",
            value: movieName,
            onChange: this.onMovieNameChange
          };

       return (<Autosuggest 
        suggestions={movieNameSuggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />);
    }

    handlePageClick = (data) => {
      let selected = data.selected;
      let offset = Math.ceil(selected * this.props.perPage);
  
      this.setState({offset: offset}, () => {
      });
    };

    render(){
        return(
  <div className="content-container">
      <div className="input-group input-group--add">
    <div className="input-group__item">
       {this.renderMovieAutoSuggest()}
  </div>
  <div className="input-group__item">
  <button className="button button--add"
        onClick={(e) => {
            this.onAdd(this.state.movieName);
          }}
  >Add Movie</button>
  </div>
  </div>
    <div className="list-header">
      <div>Your Movies</div>
    </div>
    <div className="list-body">
    <ReactPaginate previousLabel={"previous"}
    nextLabel={"next"}
    breakLabel={"..."}
    breakClassName={"break-me"}
    pageCount={10}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={this.handlePageClick}
    containerClassName={"pagination"}
    subContainerClassName={"pages pagination"}
    activeClassName={"active"} />
      {
        this.props.movies.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No movies</span>
          </div>
        ) : (
            this.props.movies.map((movie) => {
              return <MovieListItem key={movie.id} {...movie} />;
            })
          )
      }
    </div>
  </div>)
    }
}

const mapStateToProps = (state) => {
  return {
    movies: selectMovies(state.movies, state.filters),
    perPage: 5
  };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMovie: (movie) => dispatch(startAddMovie(movie))
  });
  

export default connect(mapStateToProps,mapDispatchToProps)(MovieList);

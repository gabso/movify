import React from 'react';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem';
import selectMovies from '../selectors/selectMovies';
import { Link } from 'react-router-dom';
import {startAddMovie} from '../actions/movies';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';



export class MovieList extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          movieName: '',
          movieNameSuggestions: [],
          forcedPage : 0,
          currMovies :  this.props.movies.slice(0,this.props.perPage)
        };

        this.OnRemove = this.OnRemove.bind(this);

      
      }

    

      onSuggestionsFetchRequested = async ({ value }) => {

        let res =  await axios.get(`http://localhost:3000/search/?contentName=${value}`);
        this.setState({
            movieNameSuggestions: res.data
        });
      };

      
      isMovieExists = async ( movieName ) => {

        console.log(movieName);
        let res =  await axios.get(`http://localhost:3000/ismovieexists/?contentName=${movieName}`);
        console.log('movie:',res.data);
        return res.data != '';

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


   async onAdd(movieName){

    console.log(movieName);
    // let res = await this.isMovieExists(movieName);

    //   if (!res){
    //     return;
    //   }

       this.props.startAddMovie(movieName).then(
          (res) => {

            if (res != undefined && res.error){
              toast.info(res.error);
              return;
            }

            this.setState((prevState, props) =>{
            
              return{
                offset: prevState.offset + 1,
                forcedPage: ((this.props.movies.length / this.props.perPage) -1),
                currMovies: this.props.movies.slice( this.props.movies.length - this.props.perPage , this.props.movies.length)
                // currMovies :  this.props.movies.slice(0,this.props.perPage)
              };

            });

          }
        );
    }

    OnRemove(){

  

          this.setState((prevState, props) =>{

            if (prevState.offset === this.props.movies.length){

            const lastPage = (this.props.movies.length / this.props.perPage) -1;
              const currOffset = prevState.offset -this.props.perPage;

              return {
              forcedPage: lastPage,
               offset: currOffset,
               currMovies : this.props.movies.slice(currOffset ? currOffset : 0 ,(this.props.perPage * (lastPage + 1) )  )
              };
            }
            else {
              return {
                forcedPage: null,
                currMovies :  this.props.movies.slice(prevState.offset ? prevState.offset : 0 ,(this.props.perPage * ((prevState.selected ? prevState.selected : 0) + 1) ) )
              };
            }
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
  
      this.setState({offset: offset, selected : selected, forcedPage: null,
          currMovies: this.props.movies.slice(offset,(this.props.perPage * (selected + 1) ) )
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
<button className="button"
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
    forcePage={this.state.forcedPage }
    nextLabel={"next"}
    breakLabel={"..."}
    breakClassName={"break-me"}
    pageCount={this.props.movies.length / this.props.perPage}
    marginPagesDisplayed={2}
    pageRangeDisplayed={10}
    onPageChange={this.handlePageClick}
    containerClassName={"pagination pagination--custom"}
    subContainerClassName={"pages pagination"}
    activeClassName={"active"} />
      {
        this.props.movies.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No movies</span>
          </div>
        ) : (
            this.state.currMovies.map((movie) => {
              return <MovieListItem key={movie.id} {...movie} onRemove={this.OnRemove} />;
            })
          )
      }
    </div>
  </div>)
    }
}

const mapStateToProps = (state) => {
  return {
    movies:selectMovies(state.movies, state.filters),
    perPage: 1
  };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMovie: (movie) => dispatch(startAddMovie(movie))
  });
  

export default connect(mapStateToProps,mapDispatchToProps)(MovieList);

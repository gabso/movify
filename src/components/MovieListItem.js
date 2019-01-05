import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {startRemoveMovie} from '../actions/movies';



export class  MovieListItem  extends React.Component {
    onRemove = (movie) => {
        this.props.startRemoveMovie(movie)
        .then(
          (res) =>{
            this.props.onRemove();
          }
        );
       // this.props.history.push('/');
      };
    render() {

        return (
    <div className="list-item">
    <div>
      <img src={this.props.posterURL}/>
    </div>
    <div className="list-item__content">
    <h3 className="list-item__title">{this.props.movieName} <span className="list-item__sub-title">{this.props.year}</span></h3>
    <p className="list-item__data">{this.props.overview}</p>
    </div>
    <button
      className="button button--remove"
      onClick={(e) => {
        this.onRemove(this.props);
      }}
    >
      remove
      </button>
  </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveMovie: (movie) => dispatch(startRemoveMovie(movie))
  });
  
  export default connect(undefined, mapDispatchToProps)(MovieListItem);


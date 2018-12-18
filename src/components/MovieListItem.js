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
      <h3 className="list-item__title">{this.props.movieName} <span className="list-item__sub-title">{moment(this.props.year).format('YYYY')}</span></h3>
      <img src={this.props.posterURL}/>

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


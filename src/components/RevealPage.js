import React from 'react';
import { connect } from 'react-redux';
import CustomPaginationActionsTable from '../playground/CustomPaginationActionsTable';

export class RevealPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currMovies :  this.props.movies
    };

  
  }

  render(){

    return(<CustomPaginationActionsTable/>);
    }
}


const mapStateToProps = (state) => {
  return {
    movies:state.movies,
  };
};

export default connect(mapStateToProps)(RevealPage);

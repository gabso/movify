import React from 'react';
import { connect } from 'react-redux';

export class RevealPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currMovies :  this.props.movies
    };

  
  }

  render(){

    return(<div>ff</div>);
    }
}


const mapStateToProps = (state) => {
  return {
    movies:state.movies,
  };
};

export default connect(mapStateToProps)(RevealPage);

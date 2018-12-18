import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Navigation = () => {

  return (
    <div className="page-header_custom">
      <div className="content-container">
        <div className="page-header_custom__actions">
          <Link className="button button--navigation" to="/movies">My Movies</Link>
          <Link className="button button--navigation" to="/revael">Reveal Movies</Link>
        </div>
      </div>
    </div>
  );
};


export default connect(undefined)(Navigation);

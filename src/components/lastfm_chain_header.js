import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LastFMChainHeader extends Component {
  render() {
    return (
      <div id="header" className="text-center">
        <Link to="/"><h2 className="display-4"><span className="last-fm-red-text">last.fm: </span>Compare yourself to your friend!</h2></Link>
        <p className="lead">See if you and your friend have been loving the same artists, albums, and tracks!</p>
      </div>
    );
  }
}

export default LastFMChainHeader;

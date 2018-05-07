import React, { Component } from 'react';

class LastFMChainHeader extends Component {
  render() {
    return (
      <div id="header" className="text-center">
        {/* <h1 className="display-3"></h1> */}
        <h2 className="display-4"><span className="last-fm-red-text">last.fm: </span>Compare yourself to your friend! </h2>
        <p className="lead">See if you and your friend have been loving the same artists, albums, and tracks!</p>
      </div>
    );
  }
}

export default LastFMChainHeader;

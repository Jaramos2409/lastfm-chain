import React from 'react';
import { Link } from 'react-router-dom';

const LastFMChainHeader = ()  => {
  return (
    <div id="header" className="text-center">
          <h2 className="display-4">
            <a target="_blank" href="https://www.last.fm/">
              <span className="last-fm-red-text">
                <img className="img-responsive" src="/Lastfm_logo.svg.png"/>
              </span>
            </a>
            <Link to="/">
              Compare yourself to your friend!
            </Link>
          </h2>
      <p className="lead">See if you and your friend have been loving the same artists, albums, and tracks!</p>
    </div>
  );
}

export default LastFMChainHeader;

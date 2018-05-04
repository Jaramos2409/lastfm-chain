import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class LastFMChainHeader extends Component {
  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          {/* <NavbarBrand href="/" className="mr-auto text-center">Last.fm Chain</NavbarBrand> */}
          <span class="navbar-text text-center">
            Last.fm Chain
          </span>
        </Navbar>
      </div>
    );
  }
}

export default LastFMChainHeader;

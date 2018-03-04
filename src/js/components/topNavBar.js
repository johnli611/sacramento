import React, { Component }     from 'react';
import { Link }                 from 'react-router-dom';
import SignoutButton            from './signoutButton';


export default class TopNavBar extends Component {

  render() {
    return (
      <div className="topbar">
        <div
          className="navbar navbar-default"
          role="navigation"
        >
          <div className="container">
            <div>
              <div className="pull-left">
                <button className="button-menu-mobile open-left waves-effect waves-light">
                  <i className="zmdi zmdi-menu" />
                </button>

                <span className="clearfix" />
              </div>

              <div style={{position: 'absolute', left: '50%', marginLeft: '-100px', width: '200px'}}>
                <Link
                  to="/"
                  className="logo m-l-15"
                >
                  <span>
                    AdSpecter
                  </span>
                </Link>
              </div>

              <SignoutButton/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

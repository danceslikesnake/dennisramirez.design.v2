import React, { Component } from "react";
import PropTypes from "prop-types";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="mainNavigation">
        <div className="container -expanded">
          <ul className="level is-mobile">
            <li className="level-left">
              <div className="level-item">
                <span className="mainNavigation__myName">Dennis Ramirez</span>
              </div>
            </li>
            <li className="level-right">
              <div className="level-item">
                <a
                  className="mainNavigation__hireMe"
                  href="mailTo:designexcathedra@gmail.com?subject=Hello! I would like to hire you!"
                  rel="noopener noreferrer"
                  target="_blank"
                  onMouseEnter={() => {
                    window.pauseLogoAnimation(true);
                  }}
                  onMouseLeave={() => {
                    window.pauseLogoAnimation(false);
                  }}
                >
                  Hire Me! <span className="far fa-envelope"></span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {};

export default Navigation;

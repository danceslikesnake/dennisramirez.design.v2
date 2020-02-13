import React from "react";
import PropTypes from "prop-types";

const Navigation = props => (
  <nav className="mainNavigation">
    <div className="container -expanded">
      <ul className="level is-mobile">
        <li className="level-left">
          <div className="level-item">
            {props.detailIsActive ? (
              <button
                className="mainNavigation__hireMe -isButton"
                onClick={() => {
                  props.hideDetail();
                }}
              >
                <span className="far fa-arrow-left"></span> Back
              </button>
            ) : (
              <span className="mainNavigation__myName">Dennis Ramirez</span>
            )}
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

Navigation.propTypes = {
  detailIsActive: PropTypes.bool,
  hideDetail: PropTypes.func
};

export default Navigation;

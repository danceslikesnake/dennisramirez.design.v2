import React, { Component } from "react";
import PropTypes from "prop-types";
import NavigationOverlay from "./NavigationOverlay";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavOverlay: false,
      navOverlayAction: "init"
    };
  }

  navOverlayCallBack = action => {
    switch (action) {
      case "hideComplete":
        this.setState(
          {
            showNavOverlay: false,
            navOverlayAction: "init"
          },
          () => {
            window.pauseLogoAnimation(false);
          }
        );
        break;
      case "hideCompleteFromLink":
        this.setState({
          showNavOverlay: false,
          navOverlayAction: "init"
        });
        break;
      default:
        break;
    }
  };

  manageOverlayState = () => {
    if (this.state.showNavOverlay) {
      this.setState({
        navOverlayAction: "hide"
      });
    } else {
      window.pauseLogoAnimation(true);
      this.setState({
        navOverlayAction: "reveal",
        showNavOverlay: true
      });
    }
  };

  render() {
    return (
      <>
        <nav className="mainNavigation">
          <div className="container -expanded">
            <ul className="level is-mobile">
              <li className="level-left">
                <div className="level-item">
                  {this.props.detailIsActive ? (
                    <button
                      className="mainNavigation__hireMe -isButton"
                      onClick={() => {
                        this.props.hideDetail();
                      }}
                    >
                      <span className="far fa-arrow-left"></span> Back
                    </button>
                  ) : (
                    <button
                      className="mainNavigation__hireMe -isButton"
                      onClick={() => {
                        this.manageOverlayState();
                      }}
                      onMouseEnter={() => {
                        window.pauseLogoAnimation(true);
                      }}
                      onMouseLeave={() => {
                        if (
                          !this.state.showNavOverlay &&
                          this.props.activeProjectIndex == 0
                        ) {
                          window.pauseLogoAnimation(false);
                        }
                      }}
                    >
                      <img
                        className="mainNavigation__menuButtonImg"
                        src={require("../../resources/img/nav-menu-btn.svg")}
                        alt="Menu Button Icon"
                      />
                    </button>
                  )}
                </div>
              </li>
              <li className="level-right">
                <div className="level-item">
                  <a
                    className="mainNavigation__hireMe -isSocial"
                    href="https://twitter.com/DancesLikeSnake"
                    rel="noopener noreferrer"
                    target="_blank"
                    onMouseEnter={() => {
                      window.pauseLogoAnimation(true);
                    }}
                    onMouseLeave={() => {
                      if (this.props.activeProjectIndex == 0)
                        window.pauseLogoAnimation(false);
                    }}
                  >
                    <span className="fab fa-twitter"></span>
                  </a>
                </div>
                <div className="level-item">
                  <a
                    className="mainNavigation__hireMe -isSocial"
                    href="https://www.linkedin.com/in/dennisramirez/"
                    rel="noopener noreferrer"
                    target="_blank"
                    onMouseEnter={() => {
                      window.pauseLogoAnimation(true);
                    }}
                    onMouseLeave={() => {
                      if (this.props.activeProjectIndex == 0)
                        window.pauseLogoAnimation(false);
                    }}
                  >
                    <span className="fab fa-linkedin"></span>
                  </a>
                </div>
                <div className="level-item">
                  <a
                    className="mainNavigation__hireMe"
                    href="mailto:designexcathedra@gmail.com?subject=Hello, Dennis! I would like to hire you!"
                    rel="noopener noreferrer"
                    target="_blank"
                    onMouseEnter={() => {
                      window.pauseLogoAnimation(true);
                    }}
                    onMouseLeave={() => {
                      if (this.props.activeProjectIndex == 0)
                        window.pauseLogoAnimation(false);
                    }}
                  >
                    Hire Me
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <NavigationOverlay
          projects={this.props.projects}
          navOverlayAction={this.state.navOverlayAction}
          navOverlayCallback={this.navOverlayCallBack}
          navGotoProject={this.props.navGotoProject}
        />
      </>
    );
  }
}

Navigation.propTypes = {
  detailIsActive: PropTypes.bool,
  hideDetail: PropTypes.func,
  projects: PropTypes.array,
  navGotoProject: PropTypes.func,
  activeProjectIndex: PropTypes.number
};

export default Navigation;

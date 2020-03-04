import React, { Component } from "react";
import PropTypes from "prop-types";
import NavigationOverlay from "./NavigationOverlay";
import ContactOverlay from "./ContactOverlay";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavOverlay: false,
      navOverlayAction: "init",
      showContactOverlay: false,
      contactOverlayAction: "init"
    };
  }

  navOverlayCallBack = action => {
    switch (action) {
      case "revealComplete":
        this.setState({
          navOverlayAction: "init"
        });
        break;
      case "hideComplete":
        this.props.overlayCallback(false);
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
        this.props.overlayCallback(false);
        this.setState({
          showNavOverlay: false,
          navOverlayAction: "init"
        });
        break;
      default:
        break;
    }
  };

  contactOverlayCallback = action => {
    switch (action) {
      case "revealComplete":
        this.setState({
          contactOverlayAction: "init"
        });
        break;
      case "hideComplete":
        this.props.overlayCallback(false);
        this.setState(
          {
            showContactOverlay: false,
            contactOverlayAction: "init"
          },
          () => {
            window.pauseLogoAnimation(false);
          }
        );
        break;
      default:
        break;
    }
  };

  manageOverlayState = type => {
    if (type === "nav") {
      if (!this.state.showNavOverlay) {
        window.pauseLogoAnimation(true);
        this.setState(
          {
            showNavOverlay: true
          },
          () => {
            this.props.overlayCallback(true);
            this.setState({
              navOverlayAction: "reveal"
            });
          }
        );
      }
    } else {
      if (!this.state.showContactOverlay) {
        window.pauseLogoAnimation(true);
        this.setState(
          {
            showContactOverlay: true
          },
          () => {
            this.props.overlayCallback(true);
            this.setState({
              contactOverlayAction: "reveal"
            });
          }
        );
      }
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
                        this.manageOverlayState("nav");
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
                  <button
                    className="mainNavigation__hireMe -isButton"
                    style={{ marginLeft: 0 }}
                    onClick={() => {
                      this.manageOverlayState("contact");
                    }}
                    onMouseEnter={() => {
                      window.pauseLogoAnimation(true);
                    }}
                    onMouseLeave={() => {
                      if (
                        !this.state.showContactOverlay &&
                        this.props.activeProjectIndex == 0
                      ) {
                        window.pauseLogoAnimation(false);
                      }
                    }}
                  >
                    Hire Me
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {this.state.showNavOverlay && (
          <NavigationOverlay
            projects={this.props.projects}
            navOverlayAction={this.state.navOverlayAction}
            navOverlayCallback={this.navOverlayCallBack}
            navGotoProject={this.props.navGotoProject}
          />
        )}
        {this.state.showContactOverlay && (
          <ContactOverlay
            contactOverlayAction={this.state.contactOverlayAction}
            contactOverlayCallback={this.contactOverlayCallback}
          />
        )}
      </>
    );
  }
}

Navigation.propTypes = {
  detailIsActive: PropTypes.bool,
  hideDetail: PropTypes.func,
  projects: PropTypes.array,
  navGotoProject: PropTypes.func,
  activeProjectIndex: PropTypes.number,
  overlayCallback: PropTypes.func
};

export default Navigation;

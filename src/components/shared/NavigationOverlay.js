import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import ContactOverlay from "./ContactOverlay";

class NavigationOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.navOverlay = gsap.timeline({ paused: true });
    this.navOverlayHide = gsap.timeline({ paused: true });
    this.navOverlayLinkReveal = gsap.timeline({ paused: true });
    this.navOverlayLinkHide = gsap.timeline({ paused: true });
    this.navOverlayLinkHideFromClick = gsap.timeline({ paused: true });
  }

  componentDidMount() {
    this.navOverlay.to(".navOverlay", {
      opacity: 1,
      duration: 0.5,
      ease: "expo.in",
      onComplete: () => {
        this.navOverlayLinkReveal.seek(0).play();
      },
      onReverseComplete: () => {
        document
          .getElementById("navOverlay")
          .classList.remove("-revealNavOverlay");
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.navOverlayCallback("hideComplete");
          }
        );
      }
    });

    this.navOverlayHide.to(".navOverlay", {
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        document
          .getElementById("navOverlay")
          .classList.remove("-revealNavOverlay");
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.navOverlayCallback("hideCompleteFromLink");
          }
        );
      }
    });

    this.navOverlayLinkReveal.to(".navOverlay__projectLink", {
      opacity: 1,
      duration: 1,
      ease: "expo.out",
      stagger: {
        amount: 0.2
      },
      onComplete: () => {
        this.setState({
          isAnimating: false
        });
        this.props.navOverlayCallback("revealComplete");
      }
    });

    this.navOverlayLinkHide.to(".navOverlay__projectLink", {
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      stagger: {
        amount: 0.1
      },
      onComplete: () => {
        this.navOverlay.reverse();
      }
    });

    this.navOverlayLinkHideFromClick.to(".navOverlay__projectLink", {
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      stagger: {
        amount: 0.1
      },
      onComplete: () => {
        this.navOverlayHide.seek(0).play();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.navOverlayAction !== prevProps.navOverlayAction) {
      if (!this.state.isAnimating) {
        switch (this.props.navOverlayAction) {
          case "reveal":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                document
                  .getElementById("navOverlay")
                  .classList.add("-revealNavOverlay");
                this.navOverlay.seek(0).play();
              }
            );
            break;
          case "hide":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.navOverlayLinkHide.seek(0).play();
              }
            );
            break;
          default:
            break;
        }
      }
    }
  }

  render() {
    const { projects } = this.props;
    return (
      <div id="navOverlay" className="navOverlay">
        <div className="navOverlay__actions">
          <div className="container -expanded">
            <button
              className="mainNavigation__hireMe -isButton"
              onClick={() => {
                this.setState(
                  {
                    isAnimating: true
                  },
                  () => {
                    this.navOverlayLinkHideFromClick.seek(0).play();
                  }
                );
              }}
            >
              <span>
                <i className="far fa-times" />
              </span>{" "}
              Close
            </button>
          </div>
        </div>
        <ContactOverlay
          contactOverlayAction={this.state.contactOverlayAction}
          contactOverlayCallback={this.contactOverlayCallback}
        />
        <div className="navOverlay__content">
          <h3 className="navOverlay__selectedWork">Selected Work</h3>
          <ul className="navOverlay__projectLinks">
            {projects.map((project, idx) => {
              if (project.id !== "home") {
                return (
                  <li
                    key={"nav-" + idx}
                    className="navOverlay__projectLink -animate"
                  >
                    <button
                      className="mainNavigation__hireMe -isButton -isBlock"
                      onClick={() => {
                        this.setState(
                          {
                            isAnimating: true
                          },
                          () => {
                            this.props.navGotoProject(idx);
                            this.navOverlayLinkHideFromClick.seek(0).play();
                          }
                        );
                      }}
                    >
                      {project.projectName}
                    </button>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

NavigationOverlay.propTypes = {
  projects: PropTypes.array,
  navOverlayAction: PropTypes.string,
  navOverlayCallback: PropTypes.func,
  navGotoProject: PropTypes.func
};

export default NavigationOverlay;

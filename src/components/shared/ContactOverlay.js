import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

class ContactOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.contactOverlay = gsap.timeline({ paused: true });
    this.contactOverlayHide = gsap.timeline({ paused: true });
    this.skillsReveal = gsap.timeline({ paused: true });
  }

  componentDidMount() {
    this.contactOverlay.to(".navOverlay", {
      opacity: 1,
      duration: 0.5,
      ease: "expo.in",
      onComplete: () => {
        this.skillsReveal.seek(0).play();
      }
    });

    this.contactOverlayHide.to(".navOverlay", {
      opacity: 0,
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        document
          .getElementById("contactOverlay")
          .classList.remove("-revealNavOverlay");
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.contactOverlayCallback("hideComplete");
          }
        );
      }
    });

    this.skillsReveal.from(".navOverlay__skill", {
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      stagger: {
        amount: 0.2
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.contactOverlayCallback("revealComplete");
          }
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.contactOverlayAction !== prevProps.contactOverlayAction) {
      if (!this.state.isAnimating) {
        switch (this.props.contactOverlayAction) {
          case "reveal":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                document
                  .getElementById("contactOverlay")
                  .classList.add("-revealNavOverlay");
                this.contactOverlay.seek(0).play();
              }
            );
            break;
          case "hide":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.contactOverlayHide.seek(0).play();
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
    return (
      <div id="contactOverlay" className="navOverlay">
        <div className="navOverlay__actions -isRight">
          <div className="container -expanded">
            <button
              className="mainNavigation__hireMe -isButton"
              onClick={() => {
                this.setState(
                  {
                    isAnimating: true
                  },
                  () => {
                    this.contactOverlayHide.seek(0).play();
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
        <div className="navOverlay__content">
          <h3 className="navOverlay__selectedWork">Email Me</h3>
          <ul className="navOverlay__projectLinks">
            <li className="navOverlay__projectLink has-text-centered">
              <a
                className="mainNavigation__hireMe"
                href="mailto:designexcathedra@gmail.com?subject=Hello, Dennis! I would like to hire you!"
                rel="noopener noreferrer"
                target="_blank"
                style={{ marginRight: 0 }}
              >
                designexcathedra@gmail.com
              </a>
            </li>
          </ul>
          <br />
          <h3 className="navOverlay__selectedWork">My Skillset</h3>
          <ul className="navOverlay__skills">
            <li className="navOverlay__skill">
              <span>React</span>
            </li>
            <li className="navOverlay__skill">
              <span>React Native</span>
            </li>
            <li className="navOverlay__skill">
              <span>PHP / Laravel</span>
            </li>
            <li className="navOverlay__skill">
              <span>MySQL</span>
            </li>
            <li className="navOverlay__skill">
              <span>UI / UX</span>
            </li>
            <li className="navOverlay__skill">
              <span>Branding</span>
            </li>
            <li className="navOverlay__skill">
              <span>HTML / CSS</span>
            </li>
            <li className="navOverlay__skill">
              <span>JavaScript</span>
            </li>
            <li className="navOverlay__skill">
              <span>Spark AR</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ContactOverlay.propTypes = {
  contactOverlayAction: PropTypes.string,
  contactOverlayCallback: PropTypes.func
};

export default ContactOverlay;

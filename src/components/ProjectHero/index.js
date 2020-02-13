import React, { Component } from "react";
import PropTypes from "prop-types";
import CallToAction from "../shared/CallToAction";
import { gsap } from "gsap";

class ProjectHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.actionHide = gsap.timeline({ paused: true });
    this.coverFade = gsap.timeline({ paused: true });
    this.detailBarReveal = gsap.timeline({ paused: true });
  }

  componentDidMount() {
    this.actionHide.to(".projectHero__action", {
      marginTop: -72,
      duration: 0.5,
      ease: "circ.in",
      stagger: {
        from: "end",
        amount: 0.15
      },
      onReverseComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.projectHeroCallback("clearFinish");
          }
        );
      }
    });

    this.coverFade.to(".projectHero__overlay", {
      opacity: 1,
      duration: 1.1,
      ease: "ease.out"
    });

    this.detailBarReveal.to(".projectHero__detailBarFill", {
      width: "100%",
      duration: 0.75,
      ease: "expo.in",
      delay: 0.2,
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.projectHeroCallback("obscureFinish");
          }
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.projectHeroAction !== prevProps.projectHeroAction) {
      if (!this.state.isAnimating) {
        switch (this.props.projectHeroAction) {
          case "obscure":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.coverFade.seek(0).play();
                this.actionHide.seek(0).play();
                this.detailBarReveal.seek(0).play();
              }
            );
            break;
          case "clear":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.detailBarReveal.reverse();
                this.coverFade.reverse();
                this.actionHide.reverse();
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
    const { project, projectHeroCallback } = this.props;
    return (
      <div
        className={
          this.props.detailIsVisible
            ? "projectHero -makeAbsolute"
            : "projectHero"
        }
      >
        <div
          className="projectHero__contentWrapper"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="projectHero__overlay" />
          <div className="projectHero__detailBar">
            <div className="projectHero__detailBarFill" />
          </div>
          <div className="projectHero__headlineWrapper -blendModeScreen">
            <div className="container -expanded">
              <h1 className="projectHero__headline">
                {project.projectName}
                <img
                  src={project.heroIconBlack}
                  className="projectHero__headlineIcon"
                  alt={project.projectName + " logo"}
                />
              </h1>
            </div>
          </div>
          <div className="projectHero__actions -blendModeScreen">
            <div className="container -expanded -actionMask">
              <div className="projectHero__action -skillSet">
                <strong>Skills: </strong>
                {project.heroSkillSet}
              </div>
            </div>
          </div>
          <div className="projectHero__actions">
            <div className="container -expanded -actionMask">
              <div className="projectHero__action -rightAlign">
                <CallToAction
                  ctaType="button"
                  label="Details"
                  icon="far fa-search"
                  onClick={this.props.showDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectHero.propTypes = {
  project: PropTypes.object,
  showDetail: PropTypes.func,
  projectHeroAction: PropTypes.oneOf(["init", "obscure", "clear"]),
  detailIsVisible: PropTypes.bool,
  projectHeroCallback: PropTypes.func
};

export default ProjectHero;

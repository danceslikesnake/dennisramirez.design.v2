import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import CallToAction from "../shared/CallToAction";

class HomeHero extends Component {
  componentDidMount() {
    setTimeout(window.startLogoNoise(), 1000);
  }

  componentWillUnmount() {
    window.destroy();
  }

  render() {
    const { project } = this.props;
    return (
      <>
        <canvas id="canvas" className="logoAnimation"></canvas>
        <div className="projectHero">
          <div className="projectHero__contentWrapper">
            <div className="homeLogoMask">
              <img
                className="homeLogoMask__img -desktop"
                src={require("../../resources/img/home-logo-500.png")}
                alt="Homepage Logo Mask"
              />
              <img
                className="homeLogoMask__img -mobile"
                src={require("../../resources/img/home-logo.png")}
                alt="Homepage Logo Mask"
              />
            </div>
            <div className="projectHero__content" style={{ zIndex: 6 }}>
              <div className="container -expanded">
                <h1 className="projectHero__homeHeadline">
                  {ReactHtmlParser(project.headline)}
                </h1>
                <div className="has-text-centered">
                  <CallToAction
                    label="View My Work"
                    ctaType="button"
                    icon="far fa-arrow-circle-down"
                    onClick={this.props.goToNextProject}
                    pauseHomeAnimation
                    extraClasses="-viewMyWork"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

HomeHero.propTypes = {
  project: PropTypes.object,
  goToNextProject: PropTypes.func
};

export default HomeHero;

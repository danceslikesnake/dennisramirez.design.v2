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
              />
              <img
                className="homeLogoMask__img -mobile"
                src={require("../../resources/img/home-logo.png")}
              />
            </div>
            <div className="projectHero__content" style={{ zIndex: 6 }}>
              <div className="container -expanded">
                <h1 className="projectHero__homeHeadline">
                  {ReactHtmlParser(project.headline)}
                </h1>
                <div className="projectHero__homeActions level is-mobile">
                  <div className="level-item">
                    <CallToAction
                      label="Hire me!"
                      href="mailTo:designexcathedra@gmail.com?subject=Hello! I would like to hire you!"
                      newWindow
                      icon="far fa-envelope"
                      pauseHomeAnimation
                    />
                  </div>
                  <div className="level-item">
                    <CallToAction
                      label="View My Work"
                      ctaType="button"
                      isSecondary
                      icon="far fa-arrow-circle-down"
                      onClick={this.props.goToNextProject}
                      pauseHomeAnimation
                    />
                  </div>
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
  project: PropTypes.object
};

export default HomeHero;

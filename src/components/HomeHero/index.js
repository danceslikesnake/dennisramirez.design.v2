import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import CallToAction from "../shared/CallToAction";

class HomeHero extends Component {
  render() {
    const { project } = this.props;

    return (
      <div className="projectHero">
        <div className="projectHero__contentWrapper">
          <div className="projectHero__content">
            <div className="container">
              <h1 className="projectHero__homeHeadline">
                {ReactHtmlParser(project.headline)}
              </h1>
              <div className="projectHero__actions level">
                <div className="level-item">
                  <CallToAction
                    label="Hire me!"
                    href="mailTo:designexcathedra@gmail.com?subject=Hello! I would like to hire you!"
                    newWindow
                    icon="far fa-envelope"
                  />
                </div>
                <div className="level-item">
                  <CallToAction
                    label="View Selected Projects"
                    ctaType="button"
                    isSecondary
                    icon="far fa-arrow-right"
                    onClick={this.props.tempAdvance}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeHero.propTypes = {
  project: PropTypes.object
};

export default HomeHero;

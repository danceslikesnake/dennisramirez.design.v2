import React, { Component } from "react";
import PropTypes from "prop-types";
import CallToAction from "../shared/CallToAction";

class ProjectHero extends Component {
  render() {
    const { project } = this.props;
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
            <div className="container -expanded">
              <div className="projectHero__action -skillSet">
                <strong>Skills: </strong>
                {project.heroSkillSet}
              </div>
            </div>
          </div>
          <div className="projectHero__actions">
            <div className="container -expanded">
              <div className="projectHero__action -rightAlign">
                <CallToAction
                  ctaType="button"
                  label="View Details"
                  icon="far fa-envelope"
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
  showDetail: PropTypes.bool
};

export default ProjectHero;

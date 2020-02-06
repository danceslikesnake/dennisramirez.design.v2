import React, { Component } from "react";
import PropTypes from "prop-types";

class ProjectHero extends Component {
  render() {
    const { project } = this.props;
    return (
      <div
        className="projectHero"
        style={{ backgroundImage: `url(${project.heroImage})` }}
      >
        <div className="projectHero__contentWrapper">
          <div className="projectHero__content">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">
                  <h1>{project.projectName}</h1>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">icon</div>
              </div>
            </div>
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">left action</div>
              </div>
              <div className="level-right">
                <div className="level-item">right action</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectHero.propTypes = {
  project: PropTypes.object
};

export default ProjectHero;

import React, { Component } from "react";
import PropTypes from "prop-types";

class Indicator extends Component {
  render() {
    return (
      <div
        className="indicator"
        style={{
          top:
            (window.innerHeight / this.props.numberOfProjects) *
            this.props.activeProjectIndex,
          height: 100 / this.props.numberOfProjects + "%"
        }}
      />
    );
  }
}

Indicator.propTypes = {
  activeProjectIndex: PropTypes.number,
  numberOfProjects: PropTypes.number
};

export default Indicator;

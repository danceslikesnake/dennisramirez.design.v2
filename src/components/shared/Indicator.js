import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

class Indicator extends Component {
  constructor(props) {
    super(props);
  }

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

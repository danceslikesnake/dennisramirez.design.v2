import React, { Component } from "react";
import PropTypes from "prop-types";

class ScreenshotPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="showcase__placeholder"
        style={{ paddingBottom: this.props.aspectRatio * 100 + "%" }}
      >
        <div className="showcase__placeholderContent">
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      </div>
    );
  }
}

ScreenshotPlaceholder.propTypes = {
  aspectRatio: PropTypes.number
};

export default ScreenshotPlaceholder;

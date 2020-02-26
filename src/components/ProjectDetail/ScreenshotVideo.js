import React, { Component } from "react";
import PropTypes from "prop-types";

class ScreenshotVideo extends Component {
  render() {
    let classes = "showcase__screenshot";
    if (this.props.extend) classes += " -isFullWidth";
    if (this.props.noBg) classes += " -noBg";

    return (
      <div className={classes}>
        <video
          width="100%"
          height="auto"
          controls
          poster={this.props.poster}
          loop
        >
          <source src={this.props.src} type="video/mp4" />
        </video>
        {this.props.caption && (
          <div className="showcase__caption">{this.props.caption}</div>
        )}
      </div>
    );
  }
}

ScreenshotVideo.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
  poster: PropTypes.string,
  extend: PropTypes.bool,
  noBg: PropTypes.bool
};

export default ScreenshotVideo;

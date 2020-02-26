import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";

class ScreenshotImage extends Component {
  render() {
    let classes = "showcase__screenshot";
    if (this.props.extend) classes += " -isFullWidth";
    if (this.props.noBg) classes += " -noBg";

    return (
      <div className={classes}>
        {this.props.addPhoneMask && (
          <div className="showcase__phoneMask">
            <img
              alt="phone mask"
              src={require("../../resources/img/showcase/Phone Clay.png")}
            />
          </div>
        )}
        <LazyLoad height={540} offset={208}>
          <img src={this.props.src} alt="ollo" />
        </LazyLoad>
        {this.props.caption && (
          <div className="showcase__caption">{this.props.caption}</div>
        )}
      </div>
    );
  }
}

ScreenshotImage.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
  addPhoneMask: PropTypes.bool,
  extend: PropTypes.bool,
  noBg: PropTypes.bool
};

export default ScreenshotImage;

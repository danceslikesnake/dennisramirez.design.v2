import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import PropTypes from "prop-types";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

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
        <LazyLoad
          offset={208}
          placeholder={
            <ScreenshotPlaceholder aspectRatio={this.props.aspectRatio} />
          }
        >
          <img
            src={this.props.src}
            alt="ollo"
            width={this.props.width}
            height={this.props.height}
          />
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
  noBg: PropTypes.bool,
  aspectRatio: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

export default ScreenshotImage;

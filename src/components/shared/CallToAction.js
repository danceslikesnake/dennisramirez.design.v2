import React, { Component } from "react";
import PropTypes from "prop-types";

class CallToAction extends Component {
  render() {
    const {
      ctaType,
      isSecondary,
      label,
      onClick,
      href,
      newWindow,
      icon,
      pauseHomeAnimation,
      extraClasses
    } = this.props;
    let classes = "callToAction";
    if (isSecondary) classes += " -is-secondary";
    if (extraClasses) classes += " " + extraClasses;

    switch (ctaType) {
      case "button":
        classes += " -is-button";
        return (
          <button
            className={classes}
            type="button"
            onClick={
              onClick
                ? () => {
                    onClick();
                  }
                : null
            }
            onMouseEnter={
              pauseHomeAnimation
                ? () => {
                    window.pauseLogoAnimation(true);
                  }
                : null
            }
            onMouseLeave={
              pauseHomeAnimation
                ? () => {
                    window.pauseLogoAnimation(false);
                  }
                : null
            }
          >
            <span>{label}</span>
            {icon && (
              <div className="callToAction__icon">
                <span className={icon} />
              </div>
            )}
          </button>
        );
      default:
        return (
          <a
            className={classes}
            href={href}
            target={newWindow ? "_blank" : null}
            rel="noopener noreferrer"
            onMouseEnter={
              pauseHomeAnimation
                ? () => {
                    window.pauseLogoAnimation(true);
                  }
                : null
            }
            onMouseLeave={
              pauseHomeAnimation
                ? () => {
                    window.pauseLogoAnimation(false);
                  }
                : null
            }
          >
            <span>{label}</span>
            {icon && (
              <div className="callToAction__icon">
                <span className={icon} />
              </div>
            )}
          </a>
        );
    }
  }
}

CallToAction.defaultProps = {
  ctaType: "link",
  isSecondary: false,
  newWindow: false
};

CallToAction.propTypes = {
  ctaType: PropTypes.oneOf(["link", "button"]),
  isSecondary: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  pauseHomeAnimation: PropTypes.bool,
  href: PropTypes.string,
  newWindow: PropTypes.bool,
  icon: PropTypes.string,
  extraClasses: PropTypes.string
};

export default CallToAction;

import React, { Component } from "react";
import PropTypes from "prop-types";

class CallToAction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      ctaType,
      isSecondary,
      label,
      onClick,
      href,
      newWindow,
      icon
    } = this.props;
    let classes = "callToAction";
    if (isSecondary) classes += " -is-secondary";

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
  href: PropTypes.string,
  newWindow: PropTypes.bool,
  icon: PropTypes.string
};

export default CallToAction;

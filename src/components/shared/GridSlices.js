import React, { Component } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

class GridSlices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.slicesReveal = gsap.timeline({ paused: true });
    this.slicesRevealPrev = gsap.timeline({ paused: true });
    this.slicesHide = gsap.timeline({ paused: true });
    this.slicesHidePrev = gsap.timeline({ paused: true });
  }

  componentDidMount() {
    this.slicesReveal.from(".gridSlices__slice", {
      top: "100%",
      duration: 0.65,
      ease: "expo.in",
      stagger: {
        from: "random",
        amount: 0.4
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.gridSlicesCallback("reveal");
          }
        );
      }
    });

    this.slicesHide.to(".gridSlices__slice", {
      top: "-100%",
      duration: 0.65,
      ease: "expo.in",
      stagger: {
        from: "random",
        amount: 0.4
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.gridSlicesCallback("hide");
          }
        );
      }
    });

    this.slicesRevealPrev.fromTo(
      ".gridSlices__slice",
      { top: "-100%" },
      {
        top: "0",
        duration: 0.65,
        ease: "expo.in",
        stagger: {
          from: "random",
          amount: 0.4
        },
        onComplete: () => {
          this.setState(
            {
              isAnimating: false
            },
            () => {
              this.props.gridSlicesCallback("revealPrev");
            }
          );
        }
      }
    );

    this.slicesHidePrev.to(".gridSlices__slice", {
      top: "100%",
      duration: 0.65,
      ease: "expo.in",
      stagger: {
        from: "random",
        amount: 0.4
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.gridSlicesCallback("hidePrev");
          }
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.sliceAction !== prevProps.sliceAction) {
      if (!this.state.isAnimating) {
        switch (this.props.sliceAction) {
          case "reveal":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.slicesReveal.seek(0);
                this.slicesReveal.play();
              }
            );
            break;
          case "hide":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.slicesHide.seek(0);
                this.slicesHide.play();
              }
            );
            break;
          case "revealPrev":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.slicesRevealPrev.seek(0);
                this.slicesRevealPrev.play();
              }
            );
            break;
          case "hidePrev":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.slicesHidePrev.seek(0);
                this.slicesHidePrev.play();
              }
            );
            break;
          default:
            break;
        }
      }
    }
  }

  render() {
    return (
      <div className="gridSlices">
        <div className="gridSlices__slice -one" />
        <div className="gridSlices__slice -two" />
        <div className="gridSlices__slice -three" />
        <div className="gridSlices__slice -four" />
        <div className="gridSlices__slice -five" />
        <div className="gridSlices__slice -six" />
      </div>
    );
  }
}

GridSlices.propTypes = {
  sliceAction: PropTypes.oneOf([
    "reveal",
    "hide",
    "init",
    "revealPrev",
    "hidePrev"
  ]),
  gridSlicesCallback: PropTypes.func
};

export default GridSlices;

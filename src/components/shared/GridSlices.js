import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";

class GridSlices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.slicesReveal = gsap.timeline({ paused: true });
    this.slicesHide = gsap.timeline({ paused: true });
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
      onStart: () => {
        console.log("OLLO");
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            console.log("reveal anim complete, making call back");
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
      onStart: () => {
        console.log("BOLLO");
      },
      onComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            console.log("hide anim complete, making call back");
            this.props.gridSlicesCallback("hide");
          }
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, this.props, prevState, this.state);
    if (this.props.sliceAction !== prevProps.sliceAction) {
      console.log("is valid props for slices");
      if (!this.state.isAnimating) {
        console.log("is not currently animating");
        switch (this.props.sliceAction) {
          case "reveal":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                console.log("starting reveal anim");
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
                console.log("starting hide anim");
                this.slicesHide.seek(0);
                this.slicesHide.play();
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
    //console.log('gris slices', this.props, this.state);
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
  sliceAction: PropTypes.oneOf(["reveal", "hide", "init"]),
  gridSlicesCallback: PropTypes.func
};

export default GridSlices;

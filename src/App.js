import React, { Component } from "react";
import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontIsLoading: true,
      imgsToLoad: [
        require("./resources/img/alchemy-cover.jpg"),
        require("./resources/img/punkgoes-cover.jpg"),
        require("./resources/img/starset-cover.jpg"),
        require("./resources/img/walaapp-cover.jpg")
      ],
      projects: [
        { key: "punkgoes" },
        { key: "walaapp" },
        { key: "alchemy" },
        { key: "starset" }
      ],
      imagesLoaded: false
    };

    // preliminary checks
    this.fontObserver();
    this.preloadImages(this.state.imgsToLoad);
  }

  fontObserver = () => {
    Promise.all([new FontFaceObserver("sofia-pro").load()]).then(
      () => {
        document.documentElement.classList.add("fonts-loaded");
        this.setState({ fontIsLoading: false });
      },
      err => {
        console.error("Failed to load fonts!", err);
        this.setState({ fontIsLoading: false });
      }
    );
  };

  preloadImages = imgs => {
    let imgLoadedCount = 0;
    let imgCount = imgs.length;
    imgs.forEach(url => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        imgLoadedCount++;
        if (imgLoadedCount == imgCount) {
          this.setState({
            imagesLoaded: true
          });
        }
      };
    });
  };

  render() {
    return (
      <>
        {!this.state.imagesLoaded && (
          <div className="preloader-overlay">
            <i className="far fa-spinner fa-spin"></i>
          </div>
        )}
        <div className="projectHeroImages">
          {this.state.imgsToLoad.map((imgKey, idx) => {
            return (
              <div
                key={idx}
                className="projectHeroImages__image"
                style={{ backgroundImage: `url(${imgKey})` }}
              />
            );
          })}
        </div>
      </>
    );
  }
}

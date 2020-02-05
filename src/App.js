import React, { Component } from "react";
import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontIsLoading: true,
      imagesLoaded: false
    };

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

    const preloadImages = [
      require("./resources/img/alchemy-cover.jpg"),
      require("./resources/img/punkgoes-cover.jpg"),
      require("./resources/img/starset-cover.jpg"),
      require("./resources/img/walaapp-cover.jpg")
    ];
    let imgLoadedCount = 0;
    let imgCount = preloadImages.length;
    preloadImages.forEach(url => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        imgLoadedCount++;
        console.log("Number of loaded images: " + imgLoadedCount);
        if (imgLoadedCount == imgCount) {
          console.log("ollo");
          this.setState({
            imagesLoaded: true
          });
        }
      };
    });
  }

  render() {
    return (
      <>
        {!this.state.imagesLoaded && <div className="preloader-overlay"></div>}
        <div className="projectHeroImages">
          <div className="projectHeroImages__heroImage"></div>
        </div>
      </>
    );
  }
}

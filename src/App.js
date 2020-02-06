import React, { Component } from "react";
import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

import { projects } from "./resources/data/projects";

import ProjectHero from "./components/ProjectHero/index";
import HomeHero from "./components/HomeHero";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontIsLoading: true,
      projects: projects,
      imagesLoaded: false,
      activeProjectIndex: 0
    };

    // check that fonts are loaded
    this.fontObserver();
    // preload images
    let imgsToLoad = [require("./resources/img/nav-menu-btn.svg")];
    this.state.projects.forEach((project, idx) => {
      if (project.heroImage) imgsToLoad.push(project.heroImage);
      if (project.heroIcon) imgsToLoad.push(project.heroIcon);
    });
    this.preloadImages(imgsToLoad);
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

  tempAdvance = () => {
    this.setState({ activeProjectIndex: 1 });
  };

  render() {
    const { projects, activeProjectIndex } = this.state;
    const activeProject = projects[activeProjectIndex];
    return (
      <>
        {!this.state.imagesLoaded && (
          <div className="preloader-overlay">
            <i className="far fa-spinner fa-spin" />
          </div>
        )}
        <div className="gridLines -outer" />
        <div className="gridLines -inner" />
        <nav className="mainNavigation">
          <div className="container">
            <ul className="level is-mobile">
              <li className="level-left">
                <div className="level-item">
                  <span className="mainNavigation__myName">Dennis Ramirez</span>
                </div>
              </li>
              <li className="level-right">
                <div className="level-item">
                  <button type="button" className="mainNavigation__menuButton">
                    <img
                      src={require("./resources/img/nav-menu-btn.svg")}
                      className="mainNavigation__menuButtonImg"
                    />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {activeProject.id == "home" ? (
          <HomeHero project={activeProject} tempAdvance={this.tempAdvance} />
        ) : (
          <ProjectHero project={activeProject} />
        )}
      </>
    );
  }
}

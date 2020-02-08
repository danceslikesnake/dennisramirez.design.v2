import React, { Component } from "react";

import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

import { projects } from "./resources/data/projects";

import ProjectHero from "./components/ProjectHero/index";
import HomeHero from "./components/HomeHero";
import GridSlices from "./components/shared/GridSlices";

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

let ts;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      projects: projects,
      imagesLoaded: false,
      activeProjectIndex: 0,
      projectsAreTransitioning: false,
      slicesAction: "init",
      transitionDirection: "next"
    };

    // check that fonts are loaded
    this.fontObserver();
    // preload images
    let imgsToLoad = [require("./resources/img/nav-menu-btn.svg")];
    this.state.projects.forEach((project, idx) => {
      if (project.heroImage) imgsToLoad.push(project.heroImage);
      if (project.heroIcon) imgsToLoad.push(project.heroIcon);
      if (project.heroIconBlack) imgsToLoad.push(project.heroIconBlack);
    });
    this.preloadImages(imgsToLoad);
  }

  componentDidMount() {
    window.addEventListener("wheel", this.handleScroll);
    window.addEventListener("touchstart", this.handleTouchStart);
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
    window.removeEventListener("touchstart", this.handleTouchStart);
    window.removeEventListener("touchend", this.handleTouchEnd);
  }

  fontObserver = () => {
    Promise.all([new FontFaceObserver("sofia-pro").load()]).then(
      () => {
        document.documentElement.classList.add("fonts-loaded");
        console.log("font is loaded");
        this.setState({ fontLoaded: true });
      },
      err => {
        console.error("Failed to load fonts!", err);
      }
    );
  };

  handleScroll = debounce(event => {
    if (this.state.fontLoaded === true && this.state.imagesLoaded === true) {
      //console.log("scroll event detected");
      //Normalize event wheel delta
      var delta = event.wheelDelta / 30 || -event.detail;

      //If the user scrolled up, it goes to previous slide, otherwise - to next slide
      if (!this.state.projectsAreTransitioning) {
        console.log("projects are transitioning from scroll");
        console.log(delta);
        if (delta < -1) {
          window.setTransitioning();
          this.setState(
            {
              projectsAreTransitioning: true
            },
            () => {
              this.goToNextProject();
            }
          );
        } else if (delta > 1) {
          window.setTransitioning();
          this.setState(
            {
              projectsAreTransitioning: true
            },
            () => {
              this.goToPreviousProject();
            }
          );
        }
      }
    }
  }, 15);

  handleTouchStart = debounce(event => {
    ts = event.touches[0].clientY;
  }, 15);

  handleTouchEnd = debounce(event => {
    if (!this.state.projectsAreTransitioning) {
      let te = event.changedTouches[0].clientY;
      if (ts > te + 5) {
        this.goToNextProject();
      } else if (ts < te - 5) {
        this.goToPreviousProject();
      }
    }
    event.preventDefault();
  }, 15);

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
          console.log("images are loaded");
        }
      };
    });
  };

  gridSlicesCallback = actionCompleted => {
    console.log(actionCompleted + " completed");
    if (actionCompleted == "reveal") {
      let currentIndex = this.state.activeProjectIndex;
      let totalProjects = this.state.projects.length - 1;
      console.log("transition direction is " + this.state.transitionDirection);
      console.log("project index is " + currentIndex);
      console.log("project length is " + this.state.projects.length);
      this.setState(
        {
          activeProjectIndex: currentIndex + 1
        },
        () => {
          console.log(
            "project index changed to " + this.state.activeProjectIndex
          );
          console.log("calling hide animation");
          this.setState({
            slicesAction: "hide"
          });
        }
      );
    }
    if (actionCompleted == "hide") {
      console.log("resetting animation and transition flags");
      window.setTransitioning();
      this.setState(
        {
          projectsAreTransitioning: false
        },
        () => {
          console.log("everything reset");
        }
      );
    }
  };

  goToNextProject = () => {
    console.log("next project function called");
    console.log("starting reveal animation");
    this.setState({
      slicesAction: "reveal",
      transitionDirection: "next"
    });
  };

  goToPreviousProject = () => {
    /*window.setTransitioning();
    this.setState({
      projectsAreTransitioning: true,
      slicesAction: "reveal",
      transitionDirection: "prev"
    });*/
  };

  clickAdvance = () => {
    if (!this.state.projectsAreTransitioning) {
      this.setState(
        {
          projectsAreTransitioning: true
        },
        () => {
          window.setTransitioning();
          console.log("projects are transitioning from click");
          this.goToNextProject();
        }
      );
    }
  };

  render() {
    //console.log('home', this.props, this.state);
    const { projects, activeProjectIndex } = this.state;
    const activeProject = projects[activeProjectIndex];
    return (
      <>
        {this.state.fontLoaded === false ||
        this.state.imagesLoaded === false ? (
          <div className="preloader-overlay">
            <i className="far fa-spinner fa-spin" />
          </div>
        ) : null}
        <div className="gridLines -outer" />
        <div className="gridLines -center" />
        <div className="gridLines -inner" />
        <GridSlices
          sliceAction={this.state.slicesAction}
          gridSlicesCallback={this.gridSlicesCallback}
        />
        <nav className="mainNavigation">
          <div className="container -expanded">
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
                      alt="menu button"
                    />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        {activeProject.id == "home" ? (
          <HomeHero
            project={activeProject}
            goToNextProject={this.clickAdvance}
          />
        ) : (
          <ProjectHero project={activeProject} />
        )}
      </>
    );
  }
}

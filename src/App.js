import React, { Component } from "react";

import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

import { projects } from "./resources/data/projects";

import ProjectHero from "./components/ProjectHero/index";
import HomeHero from "./components/HomeHero";
import GridSlices from "./components/shared/GridSlices";
import Navigation from "./components/shared/Navigation";
import ProjectDetail from "./components/ProjectDetail";

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
      transitionDirection: "next",
      showDetail: false
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
        this.setState({ fontLoaded: true });
      },
      err => {
        console.error("Failed to load fonts!", err);
      }
    );
  };

  handleScroll = debounce(event => {
    if (!this.state.showDetail) {
      /*console.log("scroll detected");
      console.log("window anim is paused", window.animIsPaused);
      console.log("window is transitioning", window.isTransitioning);
      console.log("state is transitioning", this.state.projectsAreTransitioning);*/
      if (!window.animIsPaused) window.pauseLogoAnimation(true);
      let currentIndex = this.state.activeProjectIndex;
      let totalProjects = this.state.projects.length - 1;
      let delta = event.wheelDelta / 30 || -event.detail;

      if (this.state.fontLoaded === true && this.state.imagesLoaded === true) {
        //Normalize event wheel delta

        //If the user scrolled up, it goes to previous slide, otherwise - to next slide
        if (!this.state.projectsAreTransitioning) {
          window.setTransitioning();
          if (delta < -1) {
            if (currentIndex < totalProjects) {
              this.setState(
                {
                  projectsAreTransitioning: true
                },
                () => {
                  this.goToNextProject();
                }
              );
            }
          } else if (delta > 1) {
            if (currentIndex > 0) {
              this.setState(
                {
                  projectsAreTransitioning: true
                },
                () => {
                  this.goToPreviousProject();
                }
              );
            }
          } else {
            window.setTransitioning();
            if (window.animIsPaused) window.pauseLogoAnimation(false);
          }
        }
      }
    }
  }, 7);

  handleTouchStart = debounce(event => {
    ts = event.touches[0].clientY;
  }, 7);

  handleTouchEnd = debounce(event => {
    if (!this.state.showDetail) {
      if (!this.state.projectsAreTransitioning) {
        let te = event.changedTouches[0].clientY;
        if (ts > te + 5) {
          this.goToNextProject();
        } else if (ts < te - 5) {
          if (this.state.activeProjectIndex > 0) {
            this.goToPreviousProject();
          }
        }
      }
    }
    event.preventDefault();
  }, 7);

  preloadImages = imgs => {
    let imgLoadedCount = 0;
    let imgCount = imgs.length;
    imgs.forEach(url => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        imgLoadedCount++;
        if (imgLoadedCount === imgCount) {
          this.setState({
            imagesLoaded: true
          });
        }
      };
    });
  };

  gridSlicesCallback = actionCompleted => {
    let currentIndex = this.state.activeProjectIndex;

    switch (actionCompleted) {
      case "reveal":
        this.setState(
          {
            activeProjectIndex: currentIndex + 1
          },
          () => {
            if (currentIndex + 1 > 0) {
              if (!document.body.classList.contains("-stopTouchReload"))
                document.body.classList.add("-stopTouchReload");
            }
            this.setState({
              slicesAction: "hide"
            });
          }
        );
        break;
      case "revealPrev":
        this.setState(
          {
            activeProjectIndex: currentIndex - 1
          },
          () => {
            if (currentIndex - 1 == 0) {
              if (document.body.classList.contains("-stopTouchReload"))
                document.body.classList.remove("-stopTouchReload");
            }
            this.setState({
              slicesAction: "hidePrev"
            });
          }
        );
        break;
      case "hidePrev":
      case "hide":
        window.setTransitioning();
        window.pauseLogoAnimation(false);
        this.setState({
          projectsAreTransitioning: false
        });
        break;
      default:
        break;
    }
  };

  goToNextProject = () => {
    this.setState({
      slicesAction: "reveal",
      transitionDirection: "next"
    });
  };

  goToPreviousProject = () => {
    this.setState({
      slicesAction: "revealPrev",
      transitionDirection: "prev"
    });
  };

  clickAdvance = () => {
    if (!this.state.projectsAreTransitioning) {
      this.setState(
        {
          projectsAreTransitioning: true
        },
        () => {
          window.setTransitioning();
          this.goToNextProject();
        }
      );
    }
  };

  showDetail = () => {
    document.body.classList.add("-unFreezeBody");
    document.body.classList.remove("-stopTouchReload");
    this.setState({
      showDetail: true
    });
  };

  render() {
    const { projects, activeProjectIndex } = this.state;
    const activeProject = projects[activeProjectIndex];
    return (
      <>
        {this.state.fontLoaded === false ||
        this.state.imagesLoaded === false ? (
          <div className="preloader-overlay">
            <i className="far fa-spinner fa-spin" style={{ color: "white" }} />{" "}
            loading...
          </div>
        ) : null}
        <div className="gridLines -outer" />

        <div className="gridLines -inner" />
        <GridSlices
          sliceAction={this.state.slicesAction}
          gridSlicesCallback={this.gridSlicesCallback}
        />
        <Navigation />
        {activeProject.id === "home" ? (
          <HomeHero
            project={activeProject}
            goToNextProject={this.clickAdvance}
          />
        ) : (
          <>
            <ProjectHero
              project={activeProject}
              detailIsVisible={this.state.showDetail}
              showDetail={this.showDetail}
            />
            {this.state.showDetail && <ProjectDetail project={activeProject} />}
          </>
        )}
      </>
    );
  }
}

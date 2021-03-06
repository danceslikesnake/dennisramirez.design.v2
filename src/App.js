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
import Indicator from "./components/shared/Indicator";

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
      fontLoaded: true,
      projects: projects,
      imagesLoaded: false,
      activeProjectIndex: 0,
      projectsAreTransitioning: false,
      slicesAction: "init",
      projectHeroAction: "init",
      transitionDirection: "next",
      detailIsTransitioning: false,
      showDetail: false,
      detailAction: "init",
      overlaysVisible: false
    };

    // check that fonts are loaded
    this.fontObserver();
    // preload images
    let imgsToLoad = [];
    this.state.projects.forEach((project, idx) => {
      if (project.heroImage) imgsToLoad.push(project.heroImage);
      if (project.heroDevice) imgsToLoad.push(project.heroDevice);
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
      },
      err => {
        console.error("Failed to load fonts!", err);
      }
    );
  };

  handleScroll = debounce(event => {
    if (
      !this.state.showDetail &&
      !this.state.detailIsTransitioning &&
      !this.state.overlaysVisible
    ) {
      if (!window.animIsPaused) window.pauseLogoAnimation(true);
      let currentIndex = this.state.activeProjectIndex;
      let totalProjects = this.state.projects.length - 1;
      let delta = event.deltaY / 30 || -event.detail;
      //console.log(delta);

      if (this.state.fontLoaded === true && this.state.imagesLoaded === true) {
        //Normalize event wheel delta

        //If the user scrolled up, it goes to previous slide, otherwise - to next slide
        if (!this.state.projectsAreTransitioning) {
          window.setTransitioning(true);
          if (delta > 0.6) {
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
          } else if (delta < -0.6) {
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
            window.setTransitioning(false);
            if (window.animIsPaused) window.pauseLogoAnimation(false);
          }
        }
      }
    }
  }, 8);

  handleTouchStart = debounce(event => {
    ts = event.touches[0].clientY;
  }, 8);

  handleTouchEnd = debounce(event => {
    if (
      !this.state.showDetail &&
      !this.state.detailIsTransitioning &&
      !this.state.overlaysVisible
    ) {
      if (!this.state.projectsAreTransitioning) {
        let te = event.changedTouches[0].clientY;
        if (ts > te + 5) {
          let totalProjects = this.state.projects.length - 1;
          if (this.state.activeProjectIndex < totalProjects)
            this.goToNextProject();
        } else if (ts < te - 5) {
          if (this.state.activeProjectIndex > 0) {
            this.goToPreviousProject();
          }
        }
      }
    }
    event.preventDefault();
  }, 8);

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
        window.setTransitioning(false);
        if (this.state.activeProjectIndex > 0) window.pauseLogoAnimation(true);
        else window.pauseLogoAnimation(false);
        this.setState({
          projectsAreTransitioning: false
        });
        break;
      default:
        break;
    }
  };

  projectHeroCallback = type => {
    switch (type) {
      case "obscureFinish":
        this.setState({
          detailIsTransitioning: false,
          showDetail: true
        });
        break;
      case "clearFinish":
        this.setState({
          detailIsTransitioning: false,
          showDetail: false
        });
        break;
      default:
        break;
    }
  };

  detailCallback = type => {
    switch (type) {
      case "clearDetailFinish":
        this.setState(
          {
            detailIsTransitioning: true,
            showDetail: false,
            detailAction: "init"
          },
          () => {
            this.setState({
              projectHeroAction: "clear"
            });
          }
        );
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
          window.setTransitioning(true);
          this.goToNextProject();
        }
      );
    }
  };

  showDetail = () => {
    document.body.classList.add("-unFreezeBody");
    document.body.classList.remove("-stopTouchReload");
    this.setState({
      detailIsTransitioning: true,
      projectHeroAction: "obscure"
    });
  };

  hideDetail = () => {
    document.body.classList.remove("-unFreezeBody");
    document.body.classList.add("-stopTouchReload");
    this.setState({
      detailAction: "clearDetail"
    });
  };

  navGotoProject = idx => {
    if (idx !== this.state.activeProjectIndex) {
      this.setState({
        activeProjectIndex: idx
      });
    }
  };

  overlayCallback = bool => {
    this.setState({
      overlaysVisible: bool
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
            <div className="preloader-content">
              <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
              </div>
              Hi! I'm Dennis Ramirez. Be with you in a second...
            </div>
          </div>
        ) : null}
        <div className="gridLines -outer" />
        <div className="gridLines -inner" />
        <GridSlices
          sliceAction={this.state.slicesAction}
          gridSlicesCallback={this.gridSlicesCallback}
        />
        <Navigation
          detailIsActive={this.state.showDetail}
          hideDetail={this.hideDetail}
          projects={projects}
          navGotoProject={this.navGotoProject}
          activeProjectIndex={activeProjectIndex}
          overlayCallback={this.overlayCallback}
        />
        {!this.state.showDetail && (
          <Indicator
            numberOfProjects={projects.length}
            activeProjectIndex={activeProjectIndex}
          />
        )}
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
              projectHeroAction={this.state.projectHeroAction}
              projectHeroCallback={this.projectHeroCallback}
            />
            {this.state.showDetail && (
              <ProjectDetail
                project={activeProject}
                detailAction={this.state.detailAction}
                detailCallback={this.detailCallback}
              />
            )}
          </>
        )}
      </>
    );
  }
}

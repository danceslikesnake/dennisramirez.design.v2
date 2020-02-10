import React, { Component } from "react";

import FontFaceObserver from "fontfaceobserver";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

import { projects } from "./resources/data/projects";

import ProjectHero from "./components/ProjectHero/index";
import HomeHero from "./components/HomeHero";
import GridSlices from "./components/shared/GridSlices";
import Navigation from "./components/shared/Navigation";

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
  }, 13);

  handleTouchStart = debounce(event => {
    ts = event.touches[0].clientY;
  }, 13);

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
  }, 13);

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
            <i className="far fa-spinner fa-spin" />
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
            {this.state.showDetail && (
              <div className="projectDetail">
                <div className="projectMarquee">
                  <div className="container -expanded">
                    <h2 className="projectMarquee__description">
                      A nostalgic throwback promoting Punk Goes Acoustic, Vol 3.
                    </h2>
                    <ul className="projectMarquee__actions">
                      <li>
                        <a
                          className="projectMarquee__action"
                          href="#"
                          target="_blank"
                        >
                          View Website{" "}
                          <span className="fad fa-external-link"></span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="projectMarquee__action"
                          href="#"
                          target="_blank"
                        >
                          View GitHub{" "}
                          <span className="fad fa-external-link"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="projectMetadata">
                  <div className="container -expanded">
                    <div className="columns projectMetadata__lists">
                      <div className="column">
                        <div className="columns is-mobile">
                          <div className="column">
                            <ul className="projectMetadata__list">
                              <li className="projectMetadata__listLabel">
                                Client
                              </li>
                              <li>Fearless Records</li>
                            </ul>
                            <ul className="projectMetadata__list">
                              <li className="projectMetadata__listLabel">
                                Tools
                              </li>
                              <li>Laravel, MySQL</li>
                            </ul>
                          </div>
                          <div className="column">
                            <ul className="projectMetadata__list">
                              <li className="projectMetadata__listLabel">
                                Services
                              </li>
                              <li>Website, CMS</li>
                            </ul>
                            <ul className="projectMetadata__list">
                              <li className="projectMetadata__listLabel">
                                YEAR
                              </li>
                              <li>2019</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <p>
                          Fearless wanted a nostalgic feel to promote the latest
                          Punk Goes Acoustic, so we redesigned everything to
                          look like the old MySpace website, warts and all.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

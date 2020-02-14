import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import LazyLoad from "react-lazyload";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false
    };

    this.revealText = gsap.timeline({ paused: false });
    this.scrollToTop = gsap.timeline({ paused: true });
  }

  componentDidMount() {
    this.revealText.from(".projectMarquee", {
      marginTop: 16,
      opacity: 0,
      duration: 0.5,
      onReverseComplete: () => {
        this.setState(
          {
            isAnimating: false
          },
          () => {
            this.props.detailCallback("clearDetailFinish");
          }
        );
      }
    });

    this.scrollToTop.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "expo.inOut"
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailAction !== prevProps.detailAction) {
      if (!this.state.isAnimating) {
        switch (this.props.detailAction) {
          case "clearDetail":
            this.setState(
              {
                isAnimating: true
              },
              () => {
                this.revealText.reverse();
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
    const { project } = this.props;
    return (
      <div className="projectDetail">
        <div className="projectMarquee">
          <div className="container -expanded">
            <h2 className="projectMarquee__description">{project.tagline}</h2>
            {project.externalLinks && (
              <ul className="projectMarquee__actions">
                {project.externalLinks.map((link, idx) => {
                  return (
                    <li key={idx}>
                      <a
                        className="projectMarquee__action"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label + " "}
                        {link.icon ? (
                          <span className={link.icon}></span>
                        ) : (
                          <span className="fad fa-external-link"></span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="projectMetadata">
          <div className="container -expanded">
            <div className="columns projectMetadata__lists">
              <div className="column">
                <div className="columns is-mobile">
                  <div className="column">
                    <ul className="projectMetadata__list">
                      <li className="projectMetadata__listLabel">Client</li>
                      <li>{project.client}</li>
                    </ul>
                    <ul className="projectMetadata__list">
                      <li className="projectMetadata__listLabel">Tools</li>
                      <li>{project.tools}</li>
                    </ul>
                  </div>
                  <div className="column">
                    <ul className="projectMetadata__list">
                      <li className="projectMetadata__listLabel">Skills</li>
                      <li>{project.skills}</li>
                    </ul>
                    <ul className="projectMetadata__list">
                      <li className="projectMetadata__listLabel">Year</li>
                      <li>{project.year}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column">
                <p>{ReactHtmlParser(project.description)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="showcase">
          <div className="container -expanded">
            {project.showcase.map((el, idx) => {
              let els = [];
              switch (el.type) {
                default:
                case "text":
                  if (el.headline)
                    els.push(
                      <div key={"d" + idx} className="showcase__title">
                        {el.headline}
                      </div>
                    );
                  if (el.description) {
                    var tmp = el.description.map((desc, idx) => {
                      return (
                        <div key={"c" + idx} className="showcase__description">
                          {desc}
                        </div>
                      );
                    });
                    els.push(tmp);
                  }
                  break;
                case "image":
                  var classes = "showcase__screenshot";

                  if (el.extend) classes += " -isFullWidth";
                  if (el.noBg) classes += " -noBg";
                  els.push(
                    <div key={"b" + idx} className={classes}>
                      <LazyLoad height={540} offset={208}>
                        <img src={el.src} alt="ollo" />
                      </LazyLoad>
                    </div>
                  );
                  break;
                case "imageGroup":
                  var imgs = el.srcs.map((img, idx) => {
                    var classThis = "showcase__screenshot";
                    if (img.noBg) classThis += " -noBg";
                    return (
                      <div key={"a" + idx} className={classThis}>
                        <LazyLoad height={540} offset={208}>
                          <img src={img.src} alt="ollo" />
                        </LazyLoad>
                      </div>
                    );
                  });
                  els.push(
                    <div
                      key={"s" + idx}
                      className="showcase__screenshotWrapper"
                    >
                      {imgs}
                    </div>
                  );
                  break;
              }
              return els;
            })}
          </div>
        </div>
        <div className="scrollToTop">
          <button
            className="scrollToTop__button"
            onClick={() => {
              this.scrollToTop.seek(0).play();
            }}
          >
            Back to Top <span className="far fa-arrow-circle-up"></span>
          </button>
        </div>
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
  detailCallback: PropTypes.func
};

export default ProjectDetail;

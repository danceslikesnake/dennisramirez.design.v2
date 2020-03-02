import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Metadata from "./Metadata";
import ScreenshotImage from "./ScreenshotImage";
import ScreenshotVideo from "./ScreenshotVideo";

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
          <Metadata
            client={project.client}
            tools={project.tools}
            skills={project.skills}
            year={project.year}
            description={project.description}
          />
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
                          {ReactHtmlParser(desc)}
                        </div>
                      );
                    });
                    els.push(tmp);
                  }
                  break;
                case "video":
                  els.push(
                    <ScreenshotVideo
                      key={"video_" + idx}
                      caption={el.caption}
                      src={el.src}
                      poster={el.poster}
                      extend={el.extend}
                      noBg={el.noBg}
                    />
                  );
                  break;
                case "image":
                  els.push(
                    <ScreenshotImage
                      key={"b" + idx}
                      caption={el.caption}
                      src={el.src}
                      addPhoneMask={el.phoneMask}
                      extend={el.extend}
                      noBg={el.noBg}
                      aspectRatio={el.aspectRatio}
                      height={el.height}
                      width={el.width}
                    />
                  );
                  break;
                case "imageGroup":
                  var imgs = el.srcs.map((img, idx) => {
                    return (
                      <ScreenshotImage
                        key={"group_image_" + idx}
                        caption={img.caption}
                        src={img.src}
                        addPhoneMask={img.phoneMask}
                        extend={img.extend}
                        noBg={img.noBg}
                        aspectRatio={img.aspectRatio}
                        height={img.height}
                        width={img.width}
                      />
                    );
                  });
                  els.push(
                    <div
                      key={"groupWrapper_" + idx}
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

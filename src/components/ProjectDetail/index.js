import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import LazyLoad from "react-lazyload";

class ProjectDetail extends Component {
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
                      <LazyLoad>
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
                        <LazyLoad>
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
        <div className="nextProject">
          <a href="javascript:;" className="nextProject__link">
            <div className="container -expanded">
              <div className="level is-mobile nextProject__content">
                <div className="level-left">
                  <div className="level-item nextProject__metaData">
                    <div>
                      <div className="nextProject__label">Next Project:</div>
                      <div className="nextProject__projectName">
                        {project.projectName}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item nextProject__icon">
                    <img src={project.heroIcon} alt="jh" />
                  </div>
                  <div className="level-item nextProject__arrow">
                    <span className="far fa-arrow-right"></span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  project: PropTypes.object
};

export default ProjectDetail;

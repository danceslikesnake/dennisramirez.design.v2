import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

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
                      <div className="showcase__title">{el.headline}</div>
                    );
                  if (el.description) {
                    el.description.map((desc, idx) => {
                      els.push(
                        <div className="showcase__description">{desc}</div>
                      );
                    });
                  }
                  break;
                case "image":
                  var classes = "showcase__screenshot";

                  if (el.extend) classes += " -isFullWidth";
                  if (el.noBg) classes += " -noBg";
                  els.push(
                    <div className={classes}>
                      <img src={el.src} />
                    </div>
                  );
                  break;
                case "imageGroup":
                  var imgs = el.srcs.map((img, idx) => {
                    var classThis = "showcase__screenshot";
                    if (img.noBg) classThis += " -noBg";
                    return (
                      <div className={classThis}>
                        <img src={img.src} />
                      </div>
                    );
                  });
                  els.push(
                    <div className="showcase__screenshotWrapper">{imgs}</div>
                  );
                  break;
              }
              return els;
            })}
            {/*<div className="showcase__title">Branding</div>
            <div className="showcase__screenshot">
              <div style={{ backgroundColor: "black", height: 350 }}></div>
            </div>
            <div className="showcase__title">Website</div>
            <div className="showcase__description">
              This is a description of the section to give some context to
              whatever is going on with this project.
            </div>
            <div className="showcase__screenshot -isFullWidth -noBg">
              <div style={{ backgroundColor: "black", height: 350 }}></div>
            </div>
            <div className="showcase__screenshotWrapper">
              <div className="showcase__screenshot">
                <div style={{ backgroundColor: "black", height: 350 }}></div>
                <div className="showcase__caption">This is a caption.</div>
              </div>
              <div className="showcase__screenshot">
                <div style={{ backgroundColor: "black", height: 350 }}></div>
                <div className="showcase__caption">This is a caption.</div>
              </div>
              <div className="showcase__screenshot">
                <div style={{ backgroundColor: "black", height: 350 }}></div>
              </div>
            </div>
            <div className="showcase__title">Identity</div>
            <div className="showcase__description">
              This is a description of the section to give some context to
              whatever is going on with this project.
            </div>
            <div className="showcase__screenshot -isFullWidth">
              <div style={{ backgroundColor: "black", height: 350 }}></div>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  project: PropTypes.object
};

export default ProjectDetail;

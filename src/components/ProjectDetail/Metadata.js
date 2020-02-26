import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

class Metadata extends Component {
  render() {
    return (
      <div className="container -expanded">
        <div className="columns projectMetadata__lists">
          <div className="column">
            <div className="columns is-mobile">
              <div className="column">
                <ul className="projectMetadata__list">
                  <li className="projectMetadata__listLabel">Client</li>
                  <li>{this.props.client}</li>
                </ul>
                <ul className="projectMetadata__list">
                  <li className="projectMetadata__listLabel">Tools</li>
                  <li>{this.props.tools}</li>
                </ul>
              </div>
              <div className="column">
                <ul className="projectMetadata__list">
                  <li className="projectMetadata__listLabel">Skills</li>
                  <li>{this.props.skills}</li>
                </ul>
                <ul className="projectMetadata__list">
                  <li className="projectMetadata__listLabel">Year</li>
                  <li>{this.props.year}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="column">
            <p>{ReactHtmlParser(this.props.description)}</p>
          </div>
        </div>
      </div>
    );
  }
}

Metadata.propTypes = {
  client: PropTypes.string,
  tools: PropTypes.string,
  skills: PropTypes.string,
  year: PropTypes.string,
  description: PropTypes.string
};

export default Metadata;

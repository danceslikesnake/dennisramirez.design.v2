import React, { Component } from "react";
import FontFaceObserver from "fontfaceobserver";
import logo from "./logo.svg";
import "./resources/sass/base.scss";
import "./resources/sass/app.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontIsLoading: true
    };

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
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

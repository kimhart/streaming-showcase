import React, { Component } from "react";
import Logo from "./logo";

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { manifestView: false }
  }

  toggleView = () => {
    const { manifestView } = this.state;
    this.setState({ manifestView: !manifestView});
    this.props.toggleView(!manifestView);
  }

  render() {
    const { manifestView } = this.state;

    return (
      <div className="header">
        <div className="header__content">
          <Logo />
          <h1>Streaming Service</h1>
          <div className="switch-wrap">
            <span>UI View</span>
            <label className="switch">
              <input type="checkbox" checked={manifestView} onChange={this.toggleView} />
              <div className="slider" />
            </label>
            <span>Manifest View</span>
          </div>
        </div>
      </div>
    )
  }
}

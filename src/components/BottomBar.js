import React from "react";
import Aid from "./Aid";
import logo from "../assets/vic-logo.svg";
import ContactButton from "./ContactButton";

class BottomBar extends React.Component {
  render() {
    return (
      <div id="navbar-bottom">
        <Aid
          id="searchAid-label"
          msg="Start Typing a Person/Project Name"
          className="aid-label"
        />
        <Aid id="searchAid" className="aid" />
        <div>
          <input
            id="autocomplete"
            type="text"
            placeholder="Search Nodes"
            spellCheck="false"
          />
        </div>
        <div id="outer-header">
          <div id="header">
            <a>Connected Worlds</a>
            <span>: Research into VR, AR and MR at Victoria</span>
            <img src={logo} alt="Connected Worlds Logo" />
          </div>
        </div>
        <ContactButton />
      </div>
    );
  }
}

export default BottomBar;

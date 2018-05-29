import React from "react";
import logo from "../assets/vic-logo.svg";
import ContactButton from "./ContactButton";

class BottomBar extends React.Component {
  render() {
    return (
      <div id="navbar-bottom">
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
        {/*<select name="contact" id="contact-button" defaultValue="github">
          <option value="help" id="help" data-class="cw-help">
            Help
          </option>
          <option
            value="mailto"
            id="mailto"
            data-class="cw-mailto"
            href="mailto:matt.plummer@vuw.ac.nz?subject=VR%20Connected%20Worlds%20Request"
          >
            Request Addition
          </option>
          <option
            value="github"
            id="github"
            data-class="cw-github"
            href="https://github.com/axbwh/VR-Network-Vis"
          >
            Submit Issue
          </option>
    </select>*/}
      </div>
    );
  }
}

export default BottomBar;
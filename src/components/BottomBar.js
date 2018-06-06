import React from "react";
import Aid from "./Aid";
import logo from "../assets/vic-logo.svg";
import aidStore from "../util/AidStore";
import ContactButton from "./ContactButton";
import { observer } from "mobx-react";

class BottomBar extends React.Component {
  clickHandler(e, type) {
    if (type === "search") {
      aidStore.aids.search = { display: "none" };
    }
    if (type === "contact") {
      aidStore.aids.contact = { display: "none" };
    }
  }

  render() {
    return (
      <div id="navbar-bottom">
        <Aid
          id="searchAid"
          msg="Start Typing a Person/Project Name"
          style={aidStore.aids.search}
        />
        <div>
          <input
            id="autocomplete"
            type="text"
            placeholder="Search Nodes"
            spellCheck="false"
            onClick={event => this.clickHandler(event, "search")}
          />
        </div>
        <div id="outer-header">
          <div id="header">
            <a>Connected Worlds</a>
            <span>: Research into VR, AR and MR at Victoria</span>
            <img src={logo} alt="Connected Worlds Logo" />
          </div>
        </div>

        <Aid
          id="contactAid"
          msg="Click Through to Request an Addition to the Dataset, Report an Issue Through GitHub or Bring Up Tooltip"
          style={aidStore.aids.contact}
        />
        <ContactButton />
      </div>
    );
  }
}

export default observer(BottomBar);

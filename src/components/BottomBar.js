import React from "react";
import Aid from "./Aid";
import Search from "./Search";
import logo from "../assets/vic-logo.svg";
import aidStore from "../util/AidStore";
import ContactButton from "./ContactButton";
import { observer } from "mobx-react";
import "./BottomBar.css";

class BottomBar extends React.Component {
  render() {
    return (
      <div id="navbar-bottom">
        <Aid
          id="searchAid"
          msg="Start Typing a Person/Project Name"
          style={aidStore.aids.search}
        />
        <Search />
        <div id="outer-header">
          <div id="header">
            <a>Connected Worlds</a>
            <span>: Research into VR, AR and MR at Victoria</span>
            <img src={logo} id="vuw-logo" alt="Connected Worlds Logo" />
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

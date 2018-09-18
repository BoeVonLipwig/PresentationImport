import React from "react";
import Search from "./Search";
import logo from "../assets/vic-logo.svg";
import ContactButton from "./ContactButton";
import { observer } from "mobx-react";

class BottomBar extends React.Component {
  render() {
    return (
      <div id="navbar-bottom">
        <Search />
        <div id="outer-header">
          <div id="header">
            <a>Connected Worlds</a>
            <span>: Research into VR, AR and MR at Victoria</span>
            <img src={logo} id="vuw-logo" alt="Connected Worlds Logo" />
          </div>
        </div>

        <ContactButton />
      </div>
    );
  }
}

export default observer(BottomBar);

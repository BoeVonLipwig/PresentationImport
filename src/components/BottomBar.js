import React from "react";
import Search from "./Search";
import logo from "../assets/vic-logo.svg";
import ContactButton from "./ContactButton";
import DataSwitch from "./DataSwitch";
import { observer } from "mobx-react";
import "./BottomBar.css";

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
        <div className="sliderContainer">
          <DataSwitch />
        </div>
        <ContactButton />
      </div>
    );
  }
}

export default observer(BottomBar);

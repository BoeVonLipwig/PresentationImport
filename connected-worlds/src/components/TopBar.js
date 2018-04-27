import React from "react";
import SelectButton from "./SelectButton";
import { setFirstButton } from "../util/EventManager";
import Views from "./Views";

class TopBar extends React.Component {
  clickHandler() {
    alert("Hello");
  }

  render() {
    return (
      <div id="navbar">
        <div id="controls" className="topnav">
          <a onClick={this.clickHandler}>
            <div id="view" className="">
              <h1>VIEW</h1>
              <h3 className="icon">&#9776;</h3>
            </div>
          </a>
          <Views />
        </div>
        <div id="toggle">
          <div className="checkbox-round">
            <input id="showInfo" type="checkbox" defaultChecked />
            <label htmlFor="showInfo" />
          </div>
          <h2>Show Details</h2>
        </div>
      </div>
    );
  }
}

export default TopBar;

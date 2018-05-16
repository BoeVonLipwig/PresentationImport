import React from "react";
import Views from "./Views";
import DetailsPane from "./DetailsPane";
import { observer } from "mobx-react";

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
        <DetailsPane />
      </div>
    );
  }
}

export default observer(TopBar);

import React from "react";
import Views from "./Views";
import DetailsPane from "./DetailsPane";
import { observer } from "mobx-react";
import "./TopBar.css";

class TopBar extends React.Component {
  clickHandler() {
    const newDict = { display: "none" };
    this.setState(Object.assign({}, this.state, newDict));
  }

  render() {
    return (
      <div id="navbar">
        <div id="controls" className="topnav">
          <a onClick={event => this.clickHandler(event)}>
            <div id="view" className="">
              <h1>VIEW</h1>
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

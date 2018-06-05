import React from "react";
import Views from "./Views";
import Aid from "./Aid";
import DetailsPane from "./DetailsPane";
import { observer } from "mobx-react";

class TopBar extends React.Component {
  clickHandler() {
    alert("Hello");
  }

  hide() {
    alert("hi");
  }

  aidViewHTML() {
    return (
      <div>
        <Aid id="viewAid" className="aid" />
        <Aid
          id="viewAid-label"
          msg="Click to Change Graph Layouts"
          className="aid-label"
          // style={{}}
        />
      </div>
    );
  }

  aidDetailHTML() {
    return (
      <div>
        <Aid id="detailAid" className="aid" />
        <Aid
          id="detailAid-label"
          msg="Project/Personal Details Will Display Here. Can Be Toggle On/Off for Better View"
          className="aid-label"
          // style={{}}
        />
      </div>
    );
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
          {this.aidViewHTML()}
          <Views />
        </div>
        {this.aidDetailHTML()}
        <DetailsPane />
      </div>
    );
  }
}

export default observer(TopBar);

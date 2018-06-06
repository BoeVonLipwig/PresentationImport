import React from "react";
import Views from "./Views";
import Aid from "./Aid";
import aidStore from "../util/AidStore";
import DetailsPane from "./DetailsPane";
import { observer } from "mobx-react";

class TopBar extends React.Component {
  clickHandler(e) {
    const newDict = { display: "none" };
    console.log(this);
    this.setState(Object.assign({}, this.state, newDict));
    alert("Hello");
  }

  aidViewHTML() {
    return (
      <Aid
        id="viewAid"
        msg="Click to Change Graph Layouts"
        style={aidStore.aids.views}
      />
    );
  }

  aidDetailHTML() {
    return (
      <Aid
        id="detailAid"
        msg="Project/Personal Details Will Display Here. Can Be Toggle On/Off for Better View"
        style={aidStore.aids.details}
      />
    );
  }

  render() {
    return (
      <div id="navbar">
        {this.aidViewHTML()}
        <div id="controls" className="topnav">
          <a onClick={event => this.clickHandler(event)}>
            <div id="view" className="">
              <h1>VIEW</h1>
              <h3 className="icon">&#9776;</h3>
            </div>
          </a>
          <Views />
        </div>
        {this.aidDetailHTML()}
        <DetailsPane />
      </div>
    );
  }
}

export default observer(TopBar);

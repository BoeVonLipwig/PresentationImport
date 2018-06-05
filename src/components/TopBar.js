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

  hide() {
    alert("hi");
  }

  aidViewHTML() {
    return (
      <div>
        <Aid id="viewAid" className="aid" style={aidStore.aids.views} />
        <Aid
          id="viewAid-label"
          msg="Click to Change Graph Layouts"
          className="aid-label"
          style={aidStore.aids.views}
        />
      </div>
    );
  }

  aidDetailHTML() {
    return (
      <div>
        <Aid id="detailAid" className="aid" style={aidStore.aids.details} />
        <Aid
          id="detailAid-label"
          msg="Project/Personal Details Will Display Here. Can Be Toggle On/Off for Better View"
          className="aid-label"
          style={aidStore.aids.details}
        />
      </div>
    );
  }

  render() {
    return (
      <div id="navbar">
        <div id="controls" className="topnav">
          <a onClick={event => this.clickHandler(event)}>
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

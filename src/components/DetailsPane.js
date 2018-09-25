import React, { Fragment } from "react";
import SelectButton from "./SelectButton";
import cytoscapeStore from "../util/CytoscapeStore";
import { observer } from "mobx-react";
import NodeInfo from "./NodeInfo";
import "./DetailsPane.css";
import aidStore from "../util/AidStore";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true
    };
  }

  clickHandler(e) {
    aidStore.aids.details = { display: "none" };
    this.setState({
      ...this.state,
      isChecked: !this.state.isChecked
    });
  }

  infoPane() {
    return (
      //Checks if a node is selected and displays the info if it is
      this.state.isChecked ? (
        <div id="infoContainer" className="info">
          <div className="container">
            {cytoscapeStore.selectedNode === null ? (
              <em>Select Any Node</em>
            ) : (
              <NodeInfo />
            )}
          </div>
        </div>
      ) : null
    );
  }

  render() {
    return (
      <div id="detailsBar">
        <div id="toggle">
          <Fragment>
            <SelectButton
              name={""}
              id={""}
              isChecked={this.state.isChecked}
              clickHandler={event => this.clickHandler(event)}
            />
            <h2>Show details</h2>
            {cytoscapeStore.selectedNode === null ? (
              ""
            ) : (
              <h1 className="nameHeader">{this.getName()}</h1>
            )}
          </Fragment>
        </div>
        <div id="nodeDetails" className="expanded">
          {this.infoPane()}
        </div>
      </div>
    );
  }

  getName() {
    return cytoscapeStore.selectedNode === null
      ? ""
      : cytoscapeStore.selectedNode.name;
  }
}

export default observer(DetailsPane);

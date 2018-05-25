import React from "react";
import SelectButton from "./SelectButton";
import cytoscapeStore from "../util/CytoscapeStore";
import { autorun } from "mobx";
import { observer } from "mobx-react";

class DetailsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: [{ isChecked: true }]
    };
  }

  clickHandler(e) {
    // compute new dictionary
    const newStatus = this.state.status.map(function(entry) {
      return Object.assign({}, entry, {
        isChecked: !entry.isChecked
      });
    });

    // assign new dictionary to the details pane select button.
    this.setState(
      Object.assign({}, this.state, {
        status: newStatus
      })
    );
  }

  infoPane() {
    return (
      //Checks if a node is selected and displays the info if it is
      this.state.status[0].isChecked ?
        <div id="infoContainer" className="info">
          <div className="container">
            <div className="info-row">
              <div>{cytoscapeStore.node === null ? <em>Select Any Node</em> : this.nodeInfo()}</div>
            </div>
          </div>
        </div> : null
    );
  }

  nodeInfo() {
    // console.log(cytoscapeStore.layout);
    console.log(cytoscapeStore.node);
    return (
      <em>node not null</em>
    );
  }

  render() {
    const elem = this.state.status.map(elem => {
      return (
        <SelectButton
          key={""}
          name={"Show Details"}
          id={""}
          isChecked={elem.isChecked}
          clickHandler={event => this.clickHandler(event)}
        />
      );
    });
    return (
      <div id="detailsBar">
        <div id="toggle">{elem}</div>
        <div id="nodeDetails" className="expanded">
          {this.infoPane()

          }
        </div>
      </div>
    );
  }
}


export default observer(DetailsPane);

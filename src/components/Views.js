import React, { Fragment } from "react";
import RadioButton from "./RadioButton";
import cytoscapeStore from "../util/CytoscapeStore";
import layoutFactory from "../util/LayoutFactory";
import { observer } from "mobx-react";
import DropDownMenu from "./DropDownMenu";

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTypes: false,
      views: [
        {
          name: "Semi-Circle",
          id: "showSegment",
          isChecked: true
        },
        {
          name: "Groups",
          id: "showCircles",
          isChecked: false
        },
        {
          name: "Collaborators",
          id: "showCollab",
          isChecked: false
        }
      ]
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  toggleCheck(id) {
    const newViews = this.state.views.map(function(entry) {
      if (entry.id === id) {
        cytoscapeStore.layoutID = entry.id;
        cytoscapeStore.layouts = layoutFactory.computeLayout(entry.id);
        return Object.assign({}, entry, {
          isChecked: true
        });
      } else {
        return Object.assign({}, entry, {
          isChecked: false
        });
      }
    });
    this.setState(
      Object.assign({}, this.state, {
        views: newViews
      })
    );
  }

  clickHandler(e, id) {
    this.toggleCheck(id);
    if (!cytoscapeStore.visNodesMap[cytoscapeStore.selectedNode])
      cytoscapeStore.selectedNode = null;
  }

  render() {
    return (
      <Fragment>
        {this.createRadio()}
        <DropDownMenu data={cytoscapeStore.specialTypes} />
      </Fragment>
    );
  }

  createRadio() {
    return this.state.views.map(elem => {
      return (
        <RadioButton
          key={elem.id}
          name={elem.name}
          id={elem.id}
          isChecked={elem.isChecked}
          clickHandler={event => this.clickHandler(event, elem.id)}
        />
      );
    });
  }
}

export default observer(Views);

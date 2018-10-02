import React, { Fragment } from "react";
import SelectButton from "./SelectButton";
import cytoscapeStore from "../util/CytoscapeStore";
import layoutFactory from "../util/LayoutFactory";

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      views: [
        {
          name: "Semi-Circle",
          id: "showSegment",
          isChecked: true
        },
        {
          name: "Many-Circle",
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
  }

  render() {
    let colabView = this.state.views[this.state.views.length - 1];
    return (
      <Fragment>
        {this.createRadio()}
        {/*{this.createMenu()}*/}
        <SelectButton
          key={colabView.id}
          name={colabView.name}
          id={colabView.id}
          isChecked={colabView.isChecked}
          clickHandler={event => this.clickHandler(event, colabView.id)}
        />
      </Fragment>
    );
  }

  createRadio() {
    console.log(cytoscapeStore.specialTypes);
    return this.state.views.map(elem => {
      return elem.name !== "Collaborators" ? (
        <SelectButton
          key={elem.id}
          name={elem.name}
          id={elem.id}
          isChecked={elem.isChecked}
          clickHandler={event => this.clickHandler(event, elem.id)}
        />
      ) : null;
    });
  }
}

export default Views;

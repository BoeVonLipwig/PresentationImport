import React from "react";
import SelectButton from "./SelectButton";
import { notify } from "../util/EventManager";

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      views: [
        {
          name: "Projects",
          id: "showProjects",
          isChecked: true,
          layout: { name: "concentric" }
        },
        {
          name: "Programme",
          id: "showSchools",
          isChecked: false,
          layout: { name: "circle" }
        },
        {
          name: "Collaborators",
          id: "showCollab",
          isChecked: false,
          layout: { name: "breadthfirst" }
        }
      ]
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  toggleCheck(id) {
    const newViews = this.state.views.map(function(entry) {
      if (entry.id === id) {
        notify(entry.layout);
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
    const items = this.state.views.map(elem => {
      return (
        <SelectButton
          key={elem.id}
          name={elem.name}
          id={elem.id}
          isChecked={elem.isChecked}
          clickHandler={event => this.clickHandler(event, elem.id)}
        />
      );
    });
    return items;
  }
}

export default Views;

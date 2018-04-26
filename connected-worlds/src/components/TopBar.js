import React from "react";
import SelectButton from "./SelectButton";

class TopBar extends React.Component {
  clickHandler() {
    alert("Hello");
  }

  render() {
    const elems = [
      { name: "Projects", id: "showProjects" },
      { name: "Programme", id: "showSchools" },
      { name: "Collaborators", id: "showCollab" }
    ];
    const items = elems.map(elem => {
      /* items are each view toggle*/
      return <SelectButton key={elem.id} name={elem.name} id={elem.id} />;
    });
    return (
      <div id="navbar">
        <div id="controls" className="topnav">
          <a onClick={this.clickHandler}>
            <div id="view" className="">
              <h1>VIEW</h1>
              <h3 className="icon">&#9776;</h3>
            </div>
          </a>
          {items}
        </div>
        <div id="toggle">
          <div className="checkbox-round">
            <input id="showInfo" type="checkbox" defaultChecked />
            <label htmlFor="showInfo" />
          </div>
          <h2>Show Details</h2>
        </div>
      </div>
    );
  }
}

export default TopBar;

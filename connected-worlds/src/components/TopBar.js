import React from "react";
import SelectButton from "./SelectButton";
import DetailsPane from "./DetailsPane";

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
          <Views />
        </div>
        <DetailsPane />
      </div>
    );
  }
}

export default TopBar;

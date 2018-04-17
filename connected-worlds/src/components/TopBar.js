import React from 'react';

class TopBar extends React.Component {
  clickHandler() {
    alert('Hello');
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

          <div className="control">
            <div className="checkbox-round">
              <input id="showProjects" type="checkbox" defaultChecked />
              <label htmlFor="showProjects" />
            </div>

            <h2>Projects</h2>
          </div>

          <div className="control">
            <div className="checkbox-round">
              <input id="showSchools" type="checkbox" />
              <label htmlFor="showSchools" />
            </div>

            <h2>Programme</h2>
          </div>

          <div className="control">
            <div className="checkbox-round">
              <input id="showCollab" type="checkbox" />
              <label htmlFor="showCollab" />
            </div>

            <h2>Collaborators</h2>
          </div>
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

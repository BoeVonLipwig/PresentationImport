import React from 'react';

class TopBar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <div id="controls" class="topnav">
          <a onclick="navbarCollapse()">
            <div id="view" class="">
              <h>VIEW</h>
              <h3 class="icon">&#9776;</h3>
            </div>
          </a>

          <div class="control">
            <div class="checkbox-round">
              <input id="showProjects" type="checkbox" checked />
              <label for="showProjects" />
            </div>

            <h2>Projects</h2>
          </div>

          <div class="control">
            <div class="checkbox-round">
              <input id="showSchools" type="checkbox" />
              <label for="showSchools" />
            </div>

            <h2>Programme</h2>
          </div>

          <div class="control">
            <div class="checkbox-round">
              <input id="showCollab" type="checkbox" />
              <label for="showCollab" />
            </div>

            <h2>Collaborators</h2>
          </div>
        </div>

        <div id="toggle">
          <div class="checkbox-round">
            <input id="showInfo" type="checkbox" checked />
            <label for="showInfo" />
          </div>
          <h2>Show Details</h2>
          <h />
        </div>
      </div>
    );
  }
}

export default TopBar;

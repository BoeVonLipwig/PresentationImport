import React from 'react';
import SelectButton from './SelectButton';

class TopBar extends React.Component {
  render() {
    const elems = [
      { name: 'Projects', id: 'showProjects' },
      { name: 'Programme', id: 'showSchools' },
      { name: 'Collaborators', id: 'showCollab' }
    ];
    const items = elems.map(elem => {
      return <SelectButton key={elem.id} name={elem.name} id={elem.id} />;
    });
    return (
      <div id="navbar">
        <div id="controls" class="topnav">
          <a onclick="navbarCollapse()">
            <div id="view" class="">
              <h>VIEW</h>
              <h3 class="icon">&#9776;</h3>
            </div>
          </a>
        </div>
        {items}
        <div id="toggle">
          <div class="checkbox-round">
            <input id="showInfo" type="checkbox" checked />
            <label for="showInfo" />
          </div>
          <h2>Show Details</h2>
        </div>
      </div>
    );
  }
}

export default TopBar;

import React from "react";
import "./ContactButton.css";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      selected: this.names[2]
    };
  }
  names = [
    ["Help", "help"],
    ["Request Addition", "mailto"],
    ["Submit Issue", "github"]
  ];

  buttonClicked = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  };

  menuClicked(text) {
    console.log(text);
    for (let i = 0; i < 3; i++) {
      if (this.names[i][0] === text) {
        this.setState({ ...this.state, selected: this.names[i] });
        break;
      }
    }
  }

  createButton = menu => {
    return (
      <div id="contact-button" onClick={this.buttonClicked}>
        <div>
          {this.state.selected[0]}
          <span className={this.state.selected[1]} />
        </div>
        {menu ? this.createMenu() : null}
      </div>
    );
  };

  createMenuItem = (name, text, key) => {
    return (
      <li
        key={key}
        className="ui-menu-item"
        onClick={() => this.menuClicked(text)}
      >
        <div className="ui-menu-item-wrapper">
          {text}
          <span className={name} />
        </div>
      </li>
    );
  };

  createMenu = () => {
    let menuItems = [];
    for (let i = 0; i < 3; i++) {
      menuItems.push(
        this.createMenuItem(this.names[i][1], this.names[i][0], i)
      );
    }
    return (
      <div className="ui-selectmenu-menu contact-menu ui-front ui-selectmenu-open contact-menu-open menu-div">
        <ul
          id="contact-menu"
          className="ui-menu ui-corner-bottom ui-widget ui-widget-content menu-ul"
        >
          {menuItems}
        </ul>
      </div>
    );
  };

  render() {
    return this.createButton(this.state.showMenu);
  }
}

export default ContactButton;

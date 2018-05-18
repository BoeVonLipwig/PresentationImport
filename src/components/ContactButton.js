import React from "react";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }
  names = [
    ["Help", "cw-help"],
    ["Request Addition", "cw-mailto"],
    ["Submit Issue", "cw-github"]
  ];
  selected = this.names[2];

  buttonClicked = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  };

  menuClicked(name) {
    for (let i = 0; i < 3; i++) {
      if (this.names[i][0] === name) {
        this.selected = this.names[i];
      }
    }
  }

  createButton = () => {
    return (
      <div id="contact-button" onClick={this.buttonClicked}>
        <div>
          {this.selected[0]}
          <span className={this.selected[1]} />
        </div>
      </div>
    );
  };

  createMenuItem = (name, text, key) => {
    return (
      <li key={key} className="ui-menu-item" onClick={this.menuClicked(text)}>
        <div>
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
        this.createMenuItem(this.names[i][0], this.names[i][1], i)
      );
    }
    let divStyles = { position: "relative", top: "436px", left: "1708px" };
    let styles = { width: "190px" };
    return (
      <div style={divStyles}>
        <ul id="contact-menu" style={styles}>
          {menuItems}
        </ul>
      </div>
    );
  };

  render() {
    if (this.state.showMenu) {
      console.log("shown");
      return [this.createButton(), this.createMenu()];
    } else {
      console.log("!shown");
      return this.createButton();
    }
  }
}

export default ContactButton;

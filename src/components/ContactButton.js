import React from "react";
import "./ContactButton.css";
import help from "../assets/help.svg";
import github from "../assets/github.svg";
import mailto from "../assets/mailto.svg";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      selected: this.names[2]
    };
  }
  names = [
    ["Help", "help", help, ""],
    [
      "Request Addition",
      "mailto",
      mailto,
      "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&su=VR+Connected+Worlds+Request&to=matt.plummer@vuw.ac.nz"
    ],
    [
      "Submit Issue",
      "github",
      github,
      "https://github.com/axbwh/VR-Network-Vis"
    ]
  ];

  buttonClicked = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
  };

  menuClicked(text) {
    for (let i = 0; i < 3; i++) {
      if (this.names[i][0] === text) {
        this.setState({ ...this.state, selected: this.names[i] });
        window.location = this.state.selected[3];
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
          <span id="img-option">
            <img src={this.state.selected[2]} height="15px" />
          </span>
        </div>
        {menu ? this.createMenu() : null}
      </div>
    );
  };

  createMenuItem = (text, name, image, key) => {
    return (
      <li
        key={key}
        className="ui-menu-item"
        onClick={() => this.menuClicked(text)}
      >
        <div className="ui-menu-item-wrapper">
          {text}
          <span className={name} />
          <span id="img-option">
            <img id="label-img" src={image} width="21px" alt="" />
          </span>
        </div>
      </li>
    );
  };

  createMenu = () => {
    let menuItems = [];
    for (let i = 0; i < 3; i++) {
      menuItems.push(
        this.createMenuItem(
          this.names[i][0],
          this.names[i][1],
          this.names[i][2],
          i
        )
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

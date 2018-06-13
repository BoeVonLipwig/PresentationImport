import React from "react";
import "./ContactButton.css";
import MailIcon from "./icons/MailIcon.js";
import HelpIcon from "./icons/HelpIcon.js";
import GithubIcon from "./icons/GithubIcon.js";
import aidStore from "../util/AidStore";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showMenu: false,
      selected: this.names[2]
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ ...this.state, showMenu: false });
    }
  }

  names = [
    ["Help", "help", HelpIcon, ""],
    ["Request Addition", "mailto", MailIcon, "mailto:matt.plummer@vuw.ac.nz"],
    [
      "Submit Issue",
      "github",
      GithubIcon,
      "https://github.com/axbwh/VR-Network-Vis"
    ]
  ];

  buttonClicked = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
    aidStore.aids.contact = { display: "none" };
  };

  menuClicked(text) {
    for (let i = 0; i < 3; i++) {
      if (this.names[i][0] === text) {
        this.setState({ ...this.state, selected: this.names[i] });
        if (this.names[i][3] === "") {
          //TODO: Show help again on click
        } else {
          window.open(this.names[i][3]);
        }
        break;
      }
    }
  }

  createButton = menu => {
    const Image = this.state.selected[2];
    let divClass = "";
    if (this.state.showMenu) {
      divClass = "contact-menu-selected";
    }
    return (
      <React.Fragment>
        <div
          id="contact-button"
          className={divClass}
          onClick={this.buttonClicked}
          ref={this.setWrapperRef}
        >
          <div>
            {this.state.selected[0]}
            <span className={this.state.selected[1]} />
            <span id="img-option">
              <Image colour="#fff" height="15px" />
            </span>
          </div>
        </div>
        {menu ? this.createMenu() : null}
      </React.Fragment>
    );
  };

  createMenuItem = (text, name, image, key) => {
    const Image = image;
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
            <Image colour="#fff" height="15px" />
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

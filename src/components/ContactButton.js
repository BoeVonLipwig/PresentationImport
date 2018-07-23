import React from "react";
import "./ContactButton.css";
import aidStore from "../util/AidStore";
import GithubButton from "./menu/GithubButton";
import MailButton from "./menu/MailButton";
import HelpButton from "./menu/HelpButton";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showMenu: false,
      selected: GithubButton
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

  buttonClicked = () => {
    this.setState({ ...this.state, showMenu: !this.state.showMenu });
    aidStore.aids.contact = { display: "none" };
  };

  createButton = menu => {
    const Selected = this.state.selected;
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
          <Selected onClick={this.toggleMenu} />
        </div>
        {menu ? this.createMenu() : null}
      </React.Fragment>
    );
  };

  toggleMenu() {
    this.setState({
      ...this.state,
      showMenu: !this.state.showMenu
    });
  }

  createMenu = () => {
    return (
      <div className="ui-selectmenu-menu contact-menu ui-front ui-selectmenu-open contact-menu-open menu-div">
        <ul
          id="contact-menu"
          className="ui-menu ui-corner-bottom ui-widget ui-widget-content menu-ul"
          onClick={console.log("menu clicked")}
        >
          <HelpButton />
          <MailButton />
          <GithubButton />
        </ul>
      </div>
    );
  };

  render() {
    return this.createButton(this.state.showMenu);
  }
}

export default ContactButton;

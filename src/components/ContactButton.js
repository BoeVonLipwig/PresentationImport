import React from "react";
import "./ContactButton.css";
import HelpButton from "./HelpButton";

class ContactButton extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.clickHandler) {
      this.buttonClicked = this.props.clickHandler;
    }
    this.buttons = [<HelpButton parent={this} menu={true} />];
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showMenu: false,
      selected: HelpButton
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  // noinspection SpellCheckingInspection
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
  };

  createButton = menu => {
    const Selected = this.state.selected;
    let divClass = "";
    if (this.state.showMenu) {
      divClass = "contact-menu-selected";
    }
    return (
      <React.Fragment>
        <div ref={this.setWrapperRef}>
          <div
            id="contact-button"
            className={divClass}
            onClick={this.buttonClicked}
          >
            <Selected parent={this} menu={false} />
          </div>
          {menu ? this.createMenu() : null}
        </div>
      </React.Fragment>
    );
  };

  createMenu = () => {
    return (
      <div className="ui-selectmenu-menu contact-menu ui-front ui-selectmenu-open contact-menu-open menu-div">
        <ul
          id="contact-menu"
          className="ui-menu ui-corner-bottom ui-widget ui-widget-content menu-ul"
        >
          {this.allButtons(this.buttons)}
        </ul>
      </div>
    );
  };

  render() {
    return this.createButton(this.state.showMenu);
  }

  allButtons(buttons) {}
}

export default ContactButton;

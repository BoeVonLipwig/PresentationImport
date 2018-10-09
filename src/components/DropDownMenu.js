import React, { Fragment } from "react";
import "./DropDownMenu.css";
import HelpButton from "./HelpButton";
import menuButton from "./MenuButton";

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.clickHandler) {
      this.buttonClicked = this.props.clickHandler;
    }
    this.buttons = this.props.data;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showMenu: true,
      selected: HelpButton
    };
  }

  render() {
    const Selected = this.state.selected;
    let divClass = "";
    if (this.state.showMenu) {
      divClass = "menu-selected";
    }
    return (
      <Fragment>
        <div ref={this.setWrapperRef}>
          <div id="buttonCss" className={divClass} onClick={this.buttonClicked}>
            <Selected parent={this} menu={false} />
          </div>
          {this.state.showMenu ? this.createMenu() : null}
        </div>
      </Fragment>
    );
  }

  createMenu = () => {
    console.log("creating menu");
    return (
      <div className="ui-selectmenu-menu menu ui-front ui-selectmenu-open menu-open menu-div">
        <ul
          id="menu"
          className="ui-menu ui-corner-bottom ui-widget ui-widget-content menu-ul"
        >
          {this.allButtons(this.buttons)}
        </ul>
      </div>
    );
  };

  allButtons(buttons) {
    return (
      <Fragment>
        {buttons.forEach(buttonName => {
          <menuButton name={buttonName} />;
        })}
      </Fragment>
    );
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
}

export default DropDownMenu;

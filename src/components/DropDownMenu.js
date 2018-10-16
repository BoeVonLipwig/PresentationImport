import React, { Fragment } from "react";
import "./DropDownMenu.css";
import MenuButton from "./MenuButton";
import cytoscapeStore from "../util/CytoscapeStore";

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.clickHandler) {
      this.buttonClicked = this.props.clickHandler;
    }
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      showMenu: false
    };
  }

  onItemSelected = name => {
    cytoscapeStore.focusType = name.toLowerCase();
    this.setState({ ...this.state, showMenu: false });
  };

  render() {
    let divClass = "";
    if (this.state.showMenu) {
      divClass = "menu-selected";
    }
    return (
      <div ref={this.setWrapperRef} className="control">
        <div className={divClass}>
          <MenuButton name="Menu" onSelect={this.buttonClicked} />
        </div>
        {this.state.showMenu ? this.createMenu() : null}
      </div>
    );
  }

  createMenu = () => {
    return (
      <div className="menu menu-open menu-div">
        <ul id="menu" className="menu-ul">
          {this.allButtons()}
        </ul>
      </div>
    );
  };

  allButtons() {
    return (
      <Fragment>
        {this.props.data.map(buttonName => (
          <MenuButton name={buttonName} onSelect={this.onItemSelected} />
        ))}
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

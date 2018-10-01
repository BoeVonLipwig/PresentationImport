import React from "react";
import { observer } from "mobx-react";
import cytoscapeStore from "../util/CytoscapeStore";
// import { autorun } from "mobx";
import "./DataSwitch.css";

class DataSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  clickHandler(e, type) {}

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      value: event.target.value
    });
    console.log(this.state.value);
  };

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ ...this.state, displayResults: false });
    }
  };

  handleNodeHover = item => {
    cytoscapeStore.hoveredNode = item.id;
  };

  handleNodeUnHover = () => {
    cytoscapeStore.hoveredNode = null;
  };

  handleSelect = item => {
    cytoscapeStore.hoveredNode = null;
    cytoscapeStore.selectedNode = item.id;
    this.setState({ ...this.state, displayResults: false, value: item.name });
  };

  render() {
    return (
      <input
        type="range"
        class="slider"
        min="0"
        max="100"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default observer(DataSwitch);

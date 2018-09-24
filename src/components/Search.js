import React from "react";
import { observer } from "mobx-react";
import aidStore from "../util/AidStore";
import cytoscapeStore from "../util/CytoscapeStore";
import { autorun } from "mobx";
import "./Search.css";
import Fuse from "fuse.js";
import SearchResults from "./SearchResults";

class Search extends React.Component {
  constructor() {
    super();
    let options = {
      keys: ["name"]
    };
    this.fuse = new Fuse(cytoscapeStore.visNodesData, options);
    this.state = {
      displayResults: true,
      results: [],
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleNodeHover = this.handleNodeHover.bind(this);
    this.handleNodeUnHover = this.handleNodeUnHover.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  clickHandler(e, type) {
    aidStore.aids.search = { display: "none" };
  }

  componentDidMount() {
    autorun(() => {
      this.fuse.setCollection(cytoscapeStore.visNodesData);
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange(event) {
    let results = this.fuse.search(event.target.value);
    this.setState({
      ...this.state,
      results: results,
      displayResults: true,
      value: event.target.value
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ ...this.state, displayResults: false });
    }
  }

  handleNodeHover(item) {
    cytoscapeStore.hoveredNode = cytoscapeStore.visNodesMap[item.id];
  }

  handleNodeUnHover() {
    cytoscapeStore.hoveredNode = null;
  }

  handleSelect(item) {
    cytoscapeStore.hoveredNode = null;
    cytoscapeStore.selectedNode = cytoscapeStore.visNodesMap[item.id];
    this.setState({ ...this.state, displayResults: false, value: item.name });
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        <SearchResults
          displayed={this.state.displayResults}
          results={this.state.results}
          onHover={this.handleNodeHover}
          onUnHover={this.handleNodeUnHover}
          onSelect={this.handleSelect}
        />
        <input
          id="autocomplete"
          type="text"
          placeholder="Search Nodes"
          spellCheck="false"
          value={this.state.value}
          onChange={this.handleChange}
          onClick={event => {
            aidStore.aids.search = { display: "none" };
          }}
        />
      </div>
    );
  }
}

export default observer(Search);

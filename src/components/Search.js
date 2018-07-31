import React from "react";
import { observer } from "mobx-react";
import aidStore from "../util/AidStore";
import cytoscapeStore from "../util/CytoscapeStore";
import { autorun } from "mobx";
import "./Search.css";

class Search extends React.Component {
  clickHandler(e, type) {
    aidStore.aids.search = { display: "none" };
  }

  componentDidMount() {
    this.$node = window.$(this.refs.autocomplete);
    this.$node.autocomplete({
      autoFocus: true,
      // minLength: 2,
      classes: {
        "ui-autocomplete": "suggestion-menu",
        "ui-menu-item": "suggestion-item"
      },
      position: {
        my: "left bottom",
        at: "left top",
        collision: "flip"
      },
      source: [""]
    });
    autorun(() => {
      this.$node.autocomplete(
        "option",
        "source",
        cytoscapeStore.visNodeNames.slice()
      );
    });
    this.$node.on("autocompletefocus", function(event, ui) {
      cytoscapeStore.hoveredNode = cytoscapeStore.visNodesMap[ui.item.value];
    });

    this.$node.on("autocompleteselect", function(event, ui) {
      cytoscapeStore.selectedNode = cytoscapeStore.visNodesMap[ui.item.value];
    });

    this.$node.on("autocompleteclose", function(event, ui) {
      cytoscapeStore.hoveredNode = null;
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Clean up the mess when the component unmounts
    this.$node.autocomplete("destroy");
  }

  render() {
    return (
      <div>
        <input
          ref="autocomplete"
          id="autocomplete"
          type="text"
          placeholder="Search Nodes"
          spellCheck="false"
          onClick={event => this.clickHandler(event, "search")}
        />
      </div>
    );
  }
}

export default observer(Search);

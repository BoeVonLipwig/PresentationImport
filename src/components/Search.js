import React from "react";
import { observer } from "mobx-react";
import aidStore from "../util/AidStore";
import $ from "jquery";
import "jquery-ui";

class Search extends React.Component {
  clickHandler(e, type) {
    aidStore.aids.search = { display: "none" };
  }

  componentDidMount() {
    this.$node = $(this.refs.autocomplete);
    this.$node.on("autocompletefocus", function(event, ui) {
      var autoName = ui.item.value;
      var node = cy.nodes('[name = "' + ui.item.value + '"]');
      var hovered = cy.nodes(".hover-hood, .hover");

      hovered.forEach(function(n) {
        hoverNight(n);
      });

      setLabels();
      hoverLight(node);
    });

    this.$node.on("autocompleteselect", function(event, ui) {
      //$( "#autocomplete" ).blur();
      var autoName = ui.item.value;
      var node = cy.nodes('[name = "' + autoName + '"]');

      cy.$(":selected").unselect();

      node.select();
    });

    this.$node.on("autocompleteclose", function(event, ui) {
      cy
        .elements()
        .removeClass("hover-hood")
        .removeClass("hover");
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

import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";
import EventManager from "../util/EventManager";

import _ from "lodash";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
  }

  setInitials(ele, cutoff01, cutoff02, space) {
    if (ele.data("name").length > cutoff01) {
      var initNum = 1;
      if (space != 1) {
        initNum = 2;
      }
    } else {
      var initNum = 0;
    }

    var nameShort = this.getInitials(ele.data("name"), initNum, space);

    if (nameShort.length > cutoff02) {
      nameShort = this.getInitials(ele.data("name"), 2, space);
    }

    return nameShort;
  }

  getInitials(string, initNum, space) {
    var names = string.split(" ");
    _.pull(names, "of", "the", "&");
    var initials = names[0].substring(0, 1).toUpperCase();

    if (space == 1) {
      var kerning = " ";
    } else {
      var kerning = "";
    }

    if (names.length > 2) {
      for (var i = 1; i < names.length - 1; i++) {
        initials += kerning + names[i].substring(0, 1).toUpperCase();
      }
    }

    if (names.length > 1) {
      if (initNum == 1 || isNaN(names[names.length - 1]) == false) {
        initials += kerning + names[names.length - 1];
      } else {
        initials +=
          kerning + names[names.length - 1].substring(0, 1).toUpperCase();
      }
    }

    if (initNum == 0) {
      initials = string;
    }

    return initials;
  }

  setLabels() {
    this.cyDiv
      .nodes('[type = "person"],[type = "project"],[type = "school"]')
      .style({
        label: function(ele) {
          return ele.data("name");
        }
      });

    this.cyDiv.nodes('[type = "project"]:unselected').style({
      label: function(ele) {
        return this.setInitials(ele, 15, 15, 2);
      }
    });

    this.cyDiv.nodes('[type = "school"]:unselected').style({
      label: function(ele) {
        return this.setInitials(ele, 12, 12, 2);
      }
    });

    if (this.cyDiv.zoom() < 1.2) {
      this.cyDiv.nodes('[type = "person"]:unselected').style({
        label: function(ele) {
          return this.setInitials(ele, 6, 6, 1);
        }
      });
    } else {
      this.cyDiv.nodes('[type = "person"]:unselected').style({
        label: function(ele) {
          return this.setInitials(ele, 12, 12, 1);
        }
      });
    }

    this.cyDiv.nodes(".highlighted").style({
      label: function(ele) {
        if (
          this.cyDiv.nodes('.highlighted[type = "project"]').size() > 5 &&
          ele.data("type") == "project"
        ) {
          return this.setInitials(ele, 6, 6, 1);
        } else {
          return ele.data("name");
        }
      }
    });
  }

  hoverLight(node) {
    node.closedNeighborhood().addClass("hover-hood");
    node.addClass("hover");
    node.style({
      label: node.data("name")
    });
  }

  hoverNight(node) {
    node.closedNeighborhood().removeClass("hover-hood");
    node.removeClass("hover");
    this.setLabels();
  }

  componentDidMount() {
    // get exported json from cytoscape desktop via ajax
    let graphP = loadData();

    // also get style via ajax
    let styleP = fetch("data.cycss").then(x => {
      return x.text();
    });

    let cy = cytoscape({
      container: this.cyDiv.current,
      style: styleP,
      elements: graphP,
      wheelSensitivity: 0.5
    });

    cy.on("mouseover", "node", e => {
      // alert("mouseover");
      var node = e.target;
      this.hoverLight(node);
      // $("#cy").css("cursor", "pointer");
    });

    cy.on("mouseout", "node", e => {
      // alert("mouseout");
      var node = e.target;
      this.hoverNight(node);
      // $("#cy").css("cursor", "default");
    });

    // wait for data to be loaded before attempt to run layout
    //EventManager.set(cy, "Concentric");
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default Cytoscape;

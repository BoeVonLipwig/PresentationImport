import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import Promise from "bluebird";
import _ from "lodash";
import { autorun } from "mobx";
import { observer } from "mobx-react";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
    this.initCy = this.initCy.bind(this);
  }

  setInitials(ele, cutoff01, cutoff02, space) {
    let initNum;
    if (ele.data("name").length > cutoff01) {
      initNum = 1;
      if (space !== 1) {
        initNum = 2;
      }
    } else {
      initNum = 0;
    }

    let nameShort = Cytoscape.getInitials(ele.data("name"), initNum, space);

    if (nameShort.length > cutoff02) {
      nameShort = Cytoscape.getInitials(ele.data("name"), 2, space);
    }

    return nameShort;
  }

  static getInitials(string, initNum, space) {
    const names = string.split(" ");
    _.pull(names, "of", "the", "&");
    let initials = names[0].substring(0, 1).toUpperCase();
    let kerning;
    if (space === 1) {
      kerning = " ";
    } else {
      kerning = "";
    }

    if (names.length > 2) {
      for (let i = 1; i < names.length - 1; i++) {
        initials += kerning + names[i].substring(0, 1).toUpperCase();
      }
    }

    if (names.length > 1) {
      if (initNum === 1 || isNaN(names[names.length - 1]) === false) {
        initials += kerning + names[names.length - 1];
      } else {
        initials +=
          kerning + names[names.length - 1].substring(0, 1).toUpperCase();
      }
    }

    if (initNum === 0) {
      initials = string;
    }

    return initials;
  }

  setLabels(cy) {
    cy.nodes('[type = "person"],[type = "project"],[type = "school"]').style({
      label: ele => {
        return ele.data("name");
      }
    });

    cy.nodes('[type = "project"]:unselected').style({
      label: ele => {
        return this.setInitials(ele, 15, 15, 2);
      }
    });

    cy.nodes('[type = "school"]:unselected').style({
      label: ele => {
        return this.setInitials(ele, 12, 12, 2);
      }
    });

    if (cy.zoom() < 1.2) {
      cy.nodes('[type = "person"]:unselected').style({
        label: ele => {
          return this.setInitials(ele, 6, 6, 1);
        }
      });
    } else {
      cy.nodes('[type = "person"]:unselected').style({
        label: ele => {
          return this.setInitials(ele, 12, 12, 1);
        }
      });
    }

    cy.nodes(".highlighted").style({
      label: ele => {
        if (
          cy.nodes('.highlighted[type = "project"]').size() > 5 &&
          ele.data("type") === "project"
        ) {
          return this.setInitials(ele, 6, 6, 1);
        } else {
          return ele.data("name");
        }
      }
    });
  }

  static hoverLight(node) {
    node.closedNeighborhood().addClass("hover-hood");
    node.addClass("hover");
    node.style({
      label: node.data("name")
    });
  }

  hoverNight(node, cy) {
    node.closedNeighborhood().removeClass("hover-hood");
    node.removeClass("hover");
    this.setLabels(cy);
  }

  addCollab(cy) {
    cy.nodes('[type = "project"]').forEach(function(projectNode) {
      projectNode
        .closedNeighborhood()
        .nodes('[type = "person"]')
        .forEach(function(person) {
          projectNode
            .closedNeighborhood()
            .nodes('[type = "person"]')
            .forEach(function(otherPerson) {
              if (
                person != otherPerson &&
                cy
                  .edges(
                    '[id ="' + person.id() + "to" + otherPerson.id() + '"]'
                  )
                  .size() < 1 &&
                cy
                  .edges(
                    '[id ="' + otherPerson.id() + "to" + person.id() + '"]'
                  )
                  .size() < 1
              ) {
                cy.add({
                  group: "edges",
                  data: {
                    id: person.id() + "to" + otherPerson.id(),
                    source: person.id(),
                    target: otherPerson.id(),
                    type: "collab"
                  }
                });
              }
            });
        });
    });
  }

  componentDidMount() {
    // get exported json from cytoscape desktop via ajax
    let graphP = loadData();

    // also get style via ajax
    let styleP = fetch("data.cycss").then(x => {
      return x.text();
    });

    Promise.all([graphP, styleP]).spread(this.initCy);
  }

  initCy(graphP, styleP) {
    this.cy = cytoscape({
      container: this.cyDiv.current,
      style: styleP,
      elements: graphP,
      wheelSensitivity: 0.5
    });

    this.addCollab(this.cy);

    this.cy.elements('[type = "school"]').addClass("school");
    this.cy.elements('[type = "project"]').addClass("project");

    this.cy.on("mouseover", "node", e => {
      // alert("mouseover");
      const node = e.target;
      Cytoscape.hoverLight(node);
      // $("#cy").css("cursor", "pointer");
    });

    this.cy.on("mouseout", "node", e => {
      // alert("mouseout");
      const node = e.target;
      this.hoverNight(node, this.cy);
      // $("#cy").css("cursor", "default");
    });

    this.cy.ready(() => {
      Layout.cy = this.cy;
      console.log("hi");
      this.props.cytoscapeStore.layout = ProjectLayout.getLayout();
      autorun(() => {
        this.props.cytoscapeStore.layout.run();
        console.log("ready");
      });
    });
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default observer(Cytoscape);

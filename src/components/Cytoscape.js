import React from "react";
import cytoscape from "cytoscape";
import loadData from "../util/data";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import aidStore from "../util/AidStore";
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
                person !== otherPerson &&
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

  addKey(cy) {
    this.keyXPadding = 100;
    this.keyYPadding = 50;

    this.keyBorder = cy.add({
      group: "nodes",
      data: { id: "keyBorder", type: "border" }
    });

    cy.add({
      group: "nodes",
      data: { id: "titleKey", name: "NODE TYPE", type: "key" }
    });

    let projectKey = cy.add({
      group: "nodes",
      data: { id: "projectKey", name: "Project", type: "key" }
    });

    projectKey.addClass("project");

    let schoolKey = cy.add({
      group: "nodes",
      data: { id: "schoolKey", name: "Programme", type: "key" }
    });

    schoolKey.addClass("school");

    cy.add([
      {
        group: "nodes",
        data: { id: "schoolKey", name: "Programme", type: "key" }
      },
      {
        group: "nodes",
        data: {
          id: "academicStaffKey",
          name: "Academic Staff",
          role: "Academic Staff",
          type: "key"
        }
      },
      {
        group: "nodes",
        data: {
          id: "postgradKey",
          name: "Post-Grad Student",
          role: "Masters Student",
          type: "key"
        }
      },
      {
        group: "nodes",
        data: {
          id: "professionalStaff",
          name: "Professional Staff",
          role: "Professional Staff",
          type: "key"
        }
      }
    ]);

    this.keys = cy.elements('[type = "key"]');
    this.keys.unselectify().ungrabify();

    this.keyBorder.unselectify().ungrabify();

    let maxLabelWidthLocal = 0;

    this.keys.forEach(function(n) {
      let labelWidth = n.boundingBox({ includeLabels: true }).w;

      if (labelWidth > maxLabelWidthLocal) {
        maxLabelWidthLocal = labelWidth;
      }
    });

    this.maxLabelWidth = maxLabelWidthLocal;
  }

  arrangeKey(cy) {
    let nodeHeight = this.keys.height();
    let bboxIgnore = cy.elements(
      '.hidden, .filtered, [type = "key"], [type = "border"]'
    );
    let bbox = cy
      .elements()
      .not(bboxIgnore)
      .boundingBox({ includeLabels: true });
    let keyNum = this.keys.size();
    let keysHeight = nodeHeight * keyNum + this.keyYPadding * (keyNum - 1);

    let layout = this.keys.layout({
      name: "grid",
      columns: 1,
      boundingBox: {
        x1: bbox.x1 - (this.maxLabelWidth + this.keyXPadding),
        y1: bbox.y1 + (bbox.h - keysHeight) / 2,
        w: this.maxLabelWidth,
        h: keysHeight
      }
    });

    this.keyBorder.position({
      x:
        bbox.x1 -
        (this.maxLabelWidth + this.keyXPadding) +
        this.maxLabelWidth / 2,
      y: bbox.y1 + (bbox.h - keysHeight) / 2 + keysHeight / 2
    });
    this.keyBorder.style({
      width: this.maxLabelWidth + this.keyXPadding / 2,
      height: keysHeight + this.keyXPadding / 2
    });

    layout.run();
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
    this.addKey(this.cy);

    this.cy.elements('[type = "school"]').addClass("school");
    this.cy.elements('[type = "project"]').addClass("project");

    this.cy.on("mouseover", "node", e => {
      const node = e.target;
      Cytoscape.hoverLight(node);
    });

    this.cy.on("mouseout", "node", e => {
      const node = e.target;
      this.hoverNight(node, this.cy);
    });

    this.cy.on("tap", "node", e => {
      aidStore.aids.details = { display: "none" };
      this.props.cytoscapeStore.node = e.target;
    });

    this.cy.ready(() => {
      Layout.cy = this.cy;
      this.props.cytoscapeStore.layouts = ProjectLayout.getLayout();
      this.setLabels(this.cy);
      autorun(() => {
        this.props.cytoscapeStore.layouts.forEach(layout => {
          layout.run();
        });
        this.arrangeKey(this.cy);
        this.cy.fit(50);
      });
    });
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default observer(Cytoscape);

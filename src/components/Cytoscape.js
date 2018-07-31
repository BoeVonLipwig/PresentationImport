import React from "react";
import cytoscape from "cytoscape";
import data from "../util/NetworkRequest";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import aidStore from "../util/AidStore";
import Promise from "bluebird";
import _ from "lodash";
import "./Cytoscape.css";
import { autorun } from "mobx";
import { observer } from "mobx-react";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.state = {
      cursor: "cy_default"
    };
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

  setVisNodeNames() {
    let visNodeNames = [];
    let visNodesMap = {};
    this.cy
      .nodes()
      .not('.hidden, .filtered, [type = "key"], [type = "border"]')
      .forEach(ele => {
        visNodeNames.push(ele.data("name"));
        visNodesMap[ele.data("name")] = ele;
      });
    this.props.cytoscapeStore.visNodeNames = visNodeNames;
    this.props.cytoscapeStore.visNodesMap = visNodesMap;
  }

  setLabels() {
    this.cy
      .nodes('[type = "person"],[type = "project"],[type = "school"]')
      .style({
        label: ele => {
          return ele.data("name");
        }
      });

    this.cy.nodes('[type = "project"]:unselected').style({
      label: ele => {
        return this.setInitials(ele, 15, 15, 2);
      }
    });

    this.cy.nodes('[type = "school"]:unselected').style({
      label: ele => {
        return this.setInitials(ele, 12, 12, 2);
      }
    });

    if (this.cy.zoom() < 1.2) {
      this.cy.nodes('[type = "person"]:unselected').style({
        label: ele => {
          return this.setInitials(ele, 6, 6, 1);
        }
      });
    } else {
      this.cy.nodes('[type = "person"]:unselected').style({
        label: ele => {
          return this.setInitials(ele, 12, 12, 1);
        }
      });
    }

    this.cy.nodes(".highlighted").style({
      label: ele => {
        if (
          this.cy.nodes('.highlighted[type = "project"]').size() > 5 &&
          ele.data("type") === "project"
        ) {
          return this.setInitials(ele, 6, 6, 1);
        } else {
          return ele.data("name");
        }
      }
    });
  }

  hoverLight(node) {
    this.setLabels();
    if (!node.hasClass("hidden")) {
      node.closedNeighborhood().addClass("hover-hood");
      node.addClass("hover");
      node.style({
        label: node.data("name")
      });
    }
  }

  hoverNight(node) {
    node.closedNeighborhood().removeClass("hover-hood");
    node.removeClass("hover");
    this.setLabels();
  }

  addCollab() {
    this.cy.nodes('[type = "project"]').forEach(projectNode => {
      projectNode
        .closedNeighborhood()
        .nodes('[type = "person"]')
        .forEach(person => {
          projectNode
            .closedNeighborhood()
            .nodes('[type = "person"]')
            .forEach(otherPerson => {
              if (
                person !== otherPerson &&
                this.cy
                  .edges(
                    '[id ="' + person.id() + "to" + otherPerson.id() + '"]'
                  )
                  .size() < 1 &&
                this.cy
                  .edges(
                    '[id ="' + otherPerson.id() + "to" + person.id() + '"]'
                  )
                  .size() < 1
              ) {
                this.cy.add({
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

  addKey() {
    this.keyXPadding = 100;
    this.keyYPadding = 50;

    this.keyBorder = this.cy.add({
      group: "nodes",
      data: { id: "keyBorder", type: "border" }
    });

    this.cy.add({
      group: "nodes",
      data: { id: "titleKey", name: "NODE TYPE", type: "key" }
    });

    let projectKey = this.cy.add({
      group: "nodes",
      data: { id: "projectKey", name: "Project", type: "key" }
    });

    projectKey.addClass("project");

    let schoolKey = this.cy.add({
      group: "nodes",
      data: { id: "schoolKey", name: "Programme", type: "key" }
    });

    schoolKey.addClass("school");

    this.cy.add([
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

    this.keys = this.cy.elements('[type = "key"]');
    this.keys.unselectify().ungrabify();

    this.keyBorder.unselectify().ungrabify();

    let maxLabelWidthLocal = 0;

    this.keys.forEach(n => {
      let labelWidth = n.boundingBox({ includeLabels: true }).w;

      if (labelWidth > maxLabelWidthLocal) {
        maxLabelWidthLocal = labelWidth;
      }
    });

    this.maxLabelWidth = maxLabelWidthLocal;
  }

  arrangeKey() {
    let maxLabelWidth = this.getMaxLabelWidth(this.keys);
    let nodeHeight = this.keys.height();
    let bboxIgnore = this.cy.elements(
      '.hidden, .filtered, [type = "key"], [type = "border"]'
    );
    let bbox = this.cy
      .elements()
      .not(bboxIgnore)
      .boundingBox({ includeLabels: true });
    let keyNum = this.keys.size();
    let keysHeight = nodeHeight * keyNum + this.keyYPadding * (keyNum - 1);

    let layout = this.keys.layout({
      name: "grid",
      columns: 1,
      boundingBox: {
        x1: bbox.x1 - (maxLabelWidth + this.keyXPadding),
        y1: bbox.y1 + (bbox.h - keysHeight) / 2,
        w: maxLabelWidth,
        h: keysHeight
      }
    });

    this.keyBorder.position({
      x: bbox.x1 - (maxLabelWidth + this.keyXPadding) + maxLabelWidth / 2,
      y: bbox.y1 + (bbox.h - keysHeight) / 2 + keysHeight / 2
    });
    this.keyBorder.style({
      width: maxLabelWidth + this.keyXPadding / 2,
      height: keysHeight + this.keyXPadding / 2
    });

    layout.run();
  }

  highlight(node) {
    node.select();
    let nhood = node.closedNeighborhood();
    this.props.cytoscapeStore.nhood = nhood;

    let dataType = node.data("type");
    if (dataType === "project" || dataType === "school") {
      let nhoodType = dataType === "project" ? "school" : "project";
      let indhood = nhood.closedNeighborhood('[type = "' + nhoodType + '"]');
      nhood = nhood.add(indhood);
    }

    let view = this.props.cytoscapeStore.view;
    if (view === "showProjects" || view === "showCollab") {
      let nschool = nhood.nodes('[type = "school"]');
      if (nschool.size() > 1) {
        this.spreadNodes(nschool);
      }
    }
  }

  spreadNodes(nodesToSpread) {
    nodesToSpread.style({
      label: ele => {
        return ele.data("name");
      }
    });

    let nodeNum = nodesToSpread.size();

    nodesToSpread.forEach(n => {
      let p = n.position();
      n.data("originPos", {
        x: p.x,
        y: p.y
      });
    });

    let nodeCenter = nodesToSpread.position();
    let nodeHeight = nodesToSpread.outerHeight();

    let maxLabelWidth = this.getMaxLabelWidth(nodesToSpread);

    let gridWidth = maxLabelWidth * nodeNum;

    let layout = nodesToSpread.layout({
      name: "grid",
      columns: nodeNum,
      boundingBox: {
        x1: nodeCenter.x - gridWidth / 2,
        y1: nodeCenter.y - nodeHeight / 2,
        w: gridWidth,
        h: nodeHeight
      },
      avoidOverlap: true,
      avoidOverlapPadding: 0,
      padding: 0
    });

    layout.run();
  }

  getMaxLabelWidth(eles) {
    var maxLabelWidth = 0;

    eles.forEach(n => {
      var labelWidth = n.boundingBox({ includeLabels: true }).w;

      if (labelWidth > maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }
    });
    return maxLabelWidth;
  }

  reframe() {
    let nhood = this.props.cytoscapeStore.nhood;
    let layoutPadding = Layout.layoutPadding;
    let details = this.props.cytoscapeStore.details;

    this.cy.batch(() => {
      //batch processess multiple eles at once
      this.cy
        .elements()
        .not(nhood)
        .removeClass("highlighted")
        .addClass("faded");
      nhood.removeClass("faded").addClass("highlighted");
      this.cy.elements('[type = "key"]').removeClass("faded");

      // Cytoscape Canvas Dimensions
      var cyW = this.cy.width();
      var cyH = this.cy.height();

      if (details) {
        if (nhood.nodes().size() < 3) {
          nhood = this.cy.nodes();
        }

        this.cy.maxZoom(100);

        var ogPan = Object.assign({}, this.cy.pan());
        var ogZoom = this.cy.zoom();

        this.cy.stop().fit(nhood, 0);
        var fitZoom = this.cy.zoom();

        //Highlighted Node Bouding Box Dimension before Being Resized
        var nhoodHeight = nhood.renderedBoundingBox().h;
        var nhoodWidth = nhood.renderedBoundingBox().w;

        var nhoodRatio = nhoodHeight / nhoodWidth;

        //Info Window Dimension
        var infoWidth = document.getElementById("infoContainer").clientWidth;
        var infoHeight = document.getElementById("infoContainer").clientHeight;

        //Left Negative Space Dimensions minus Padding
        var leftWidth = cyW - (infoWidth + layoutPadding * 2);
        var leftHeight = cyH - layoutPadding * 2;

        //Bottom Negative Space Dimensions minus Padding
        var bottomWidth = cyW - layoutPadding * 2;
        var bottomHeight = cyH - (infoHeight + layoutPadding * 2);

        var panOffset = { x: 0, y: 0 };

        //Check Whether Left or Bottom offer Largest Possible Display Area for Nodes Bounding Box

        //Calc area for each alignment
        var alignment = [];
        ////Align Left, Width First // Height First
        alignment[0] = {
          placement: "left",
          order: "width",
          width: leftWidth,
          height: leftWidth * nhoodRatio
        };

        alignment[1] = {
          placement: "left",
          order: "height",
          width: leftHeight / nhoodRatio,
          height: leftHeight
        };

        ////Align Bottom, Width First // Height First
        alignment[2] = {
          placement: "bottom",
          order: "width",
          width: bottomWidth,
          height: bottomWidth * nhoodRatio
        };

        alignment[3] = {
          placement: "bottom",
          order: "height",
          width: bottomHeight / nhoodRatio,
          height: bottomHeight
        };

        alignment.map(ali => (ali.area = ali.width * ali.height));

        alignment = _.orderBy(
          alignment,
          [
            ali => {
              return ali.area;
            }
          ],
          ["desc"]
        );

        var isAligned = false;

        for (let i = 0; i < 3 && isAligned === false; i++) {
          let curAli = alignment[i];

          if (
            curAli.placement === "left" &&
            curAli.order === "width" &&
            curAli.height < leftHeight
          ) {
            var scaleFactor = leftWidth / nhoodWidth;
            var newZoom = fitZoom * scaleFactor;

            panOffset.x = -(infoWidth / 2);
            panOffset.y = 0;

            isAligned = true;
          }

          if (
            curAli.placement === "left" &&
            curAli.order === "height" &&
            curAli.width < leftWidth
          ) {
            scaleFactor = leftHeight / nhoodHeight;
            newZoom = fitZoom * scaleFactor;

            panOffset.x = -(infoWidth / 2);
            panOffset.y = 0;

            isAligned = true;
          }

          if (
            curAli.placement === "bottom" &&
            curAli.order === "width" &&
            curAli.height < bottomHeight
          ) {
            scaleFactor = bottomWidth / nhoodWidth;
            newZoom = fitZoom * scaleFactor;

            panOffset.x = 0;
            panOffset.y = infoHeight / 2;

            isAligned = true;
          }

          if (
            curAli.placement === "bottom" &&
            curAli.order === "height" &&
            curAli.width < bottomWidth
          ) {
            scaleFactor = bottomHeight / nhoodHeight;
            newZoom = fitZoom * scaleFactor;

            panOffset.x = 0;
            panOffset.y = infoHeight / 2;

            isAligned = true;
          }
        }

        this.cy.zoom(newZoom);
        this.cy.center(nhood);
        var centerPan = Object.assign({}, this.cy.pan());

        this.cy.zoom(ogZoom);
        this.cy.pan(ogPan);
        this.cy.pan(centerPan);

        this.cy.stop().animate(
          {
            //frames all elements
            zoom: newZoom,
            pan: { x: centerPan.x + panOffset.x, y: centerPan.y + panOffset.y }
          },
          {
            duration: 150
          }
        );
      } else {
        this.cy.stop().animate(
          {
            //frames all elements
            fit: {
              eles: nhood,
              padding: layoutPadding
            }
          },
          {
            duration: 150
          }
        );
      }
    });
  }

  fitAll() {
    this.cy.animate(
      {
        fit: {
          eles: this.cy.elements().not(".hidden, .filtered"),
          padding: Layout.layoutPadding
        }
      },
      {
        duration: 150
      }
    );
  }

  clear() {
    this.cy
      .elements()
      .removeClass("highlighted")
      .removeClass("faded");
  }

  componentDidMount() {
    // get exported json from cytoscape desktop via ajax
    let graphP = data.getGraphP();

    // also get style via ajax
    let styleP = data.getStyleP();

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
      this.setState({
        ...this.state,
        cursor: "cy_pointer"
      });
      this.props.cytoscapeStore.hoveredNode = e.target;
    });

    this.cy.on("mouseout", "node", e => {
      this.setState({
        ...this.state,
        cursor: "cy_default"
      });
      this.props.cytoscapeStore.hoveredNode = null;
    });

    this.cy.on("select", "node", e => {
      aidStore.aids.details = { display: "none" };
      this.props.cytoscapeStore.selectedNode = e.target;
    });
    this.cy.on("unselect", "node", e => {
      this.props.cytoscapeStore.selectedNode = null;
    });

    this.cy.ready(() => {
      Layout.cy = this.cy;
      this.props.cytoscapeStore.layouts = ProjectLayout.getLayout();
      this.setLabels();

      autorun(() => {
        this.props.cytoscapeStore.layouts.forEach(layout => {
          layout.run();
        });
        this.arrangeKey();
        this.cy.fit(50);
        this.setVisNodeNames();
      });

      autorun(() => {
        this.clear();
        if (this.props.cytoscapeStore.selectedNode === null) {
          this.fitAll();
        } else {
          let nhood = this.highlight(this.props.cytoscapeStore.selectedNode);
          this.reframe(nhood);
        }
        this.setLabels();
      });

      autorun(() => {
        let hovered = this.cy.nodes(".hover-hood, .hover");
        hovered.forEach(n => {
          this.hoverNight(n);
        });
        if (this.props.cytoscapeStore.hoveredNode !== null) {
          this.hoverLight(this.props.cytoscapeStore.hoveredNode);
        }
      });
    });
  }

  render() {
    return <div ref={this.cyDiv} className={this.state.cursor} id="cy" />;
  }
}

export default observer(Cytoscape);

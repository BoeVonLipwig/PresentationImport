import React from "react";
import cytoscape from "cytoscape";
import data from "../util/NetworkRequest";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import Promise from "bluebird";
import _ from "lodash";
import "./Cytoscape.css";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import Style from "./StyleCytoscape";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import color from "../assets/colors.json";

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.state = {
      cursor: "cy_default",
      loading: true
    };
    this.cyDiv = React.createRef();
    this.initCy = this.initCy.bind(this);
    this.nhood = null;
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
    _.pull(names, "of", "the", "&", "and");
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

  setVisNodes() {
    let visNodesMap = {};
    let visNodesData = [];
    this.cy
      .nodes()
      .not('.hidden, .filtered, [type = "key"], [type = "border"]')
      .forEach(ele => {
        let node = ele.data();
        visNodesData.push(node);
        visNodesMap[node.id] = node;
      });
    this.props.cytoscapeStore.visNodesMap = visNodesMap;
    this.props.cytoscapeStore.visNodesData = visNodesData;
  }

  setLabels() {
    this.cy.nodes().forEach(ele => {
      ele.style("label", ele.data("name"));
    });

    this.cy
      .nodes('[type != "person"][type != "key"][type != "border"]:unselected')
      .style({
        label: ele => this.setInitials(ele, 15, 15, 2)
      });

    if (this.cy.zoom() < 1.2) {
      this.cy.nodes('[type = "person"]:unselected').style({
        label: ele => this.setInitials(ele, 6, 6, 1)
      });
    } else {
      this.cy.nodes('[type = "person"]:unselected').style({
        label: ele => this.setInitials(ele, 12, 12, 1)
      });
    }

    this.cy.nodes(".highlighted").style({
      label: ele => ele.data("name")
    });
  }

  hoverLight(node) {
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

  addKey() {
    this.keyXPadding = 100;
    this.keyYPadding = 50;
    this.keys = this.cy.elements('[type = "key"]');
    this.keyBorder = this.cy.elements('[type = "border"]');
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
    this.nhood = nhood;

    let dataType = node.data("type");
    if (this.props.cytoscapeStore.specialTypes.includes(dataType)) {
      let unselectedSpecialFilters = this.props.cytoscapeStore.specialTypes
        .filter(type => type !== dataType)
        .map(type => `[type = '${type}']`);
      let jointFilter = unselectedSpecialFilters.join(",");
      let relatedSpecialNodes = nhood.closedNeighborhood(jointFilter).nodes();

      this.spreadNodes(relatedSpecialNodes);
      nhood = nhood.add(relatedSpecialNodes);
      this.props.cytoscapeStore.nhood = nhood;
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

  unspreadNodes() {
    this.cy.nodes().forEach(n => {
      if (n.data("originPos")) {
        let pos = n.data("originPos");
        n.position({ x: pos.x, y: pos.y });
        n.removeData("originPos");
      }
    });
  }

  getMaxLabelWidth(eles) {
    let maxLabelWidth = 0;

    eles.forEach(n => {
      let labelWidth = n.boundingBox({ includeLabels: true }).w;

      if (labelWidth > maxLabelWidth) {
        maxLabelWidth = labelWidth;
      }
    });
    return maxLabelWidth;
  }

  reframe() {
    let nhood = this.nhood;
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
      let cyW = this.cy.width();
      let cyH = this.cy.height();

      if (details) {
        if (nhood.nodes().size() < 3) {
          nhood = this.cy.nodes();
        }

        this.cy.maxZoom(100);

        let ogPan = Object.assign({}, this.cy.pan());
        let ogZoom = this.cy.zoom();

        this.cy.stop().fit(nhood, 0);
        let fitZoom = this.cy.zoom();

        //Highlighted Node Bouding Box Dimension before Being Resized
        let nhoodHeight = nhood.renderedBoundingBox().h;
        let nhoodWidth = nhood.renderedBoundingBox().w;

        let nhoodRatio = nhoodHeight / nhoodWidth;

        //Info Window Dimension
        let infoWidth = document.getElementById("infoContainer").clientWidth;
        let infoHeight = document.getElementById("infoContainer").clientHeight;

        //Left Negative Space Dimensions minus Padding
        let leftWidth = cyW - (infoWidth + layoutPadding * 2);
        let leftHeight = cyH - layoutPadding * 2;

        //Bottom Negative Space Dimensions minus Padding
        let bottomWidth = cyW - layoutPadding * 2;
        let bottomHeight = cyH - (infoHeight + layoutPadding * 2);

        let panOffset = { x: 0, y: 0 };

        //Check Whether Left or Bottom offer Largest Possible Display Area for Nodes Bounding Box

        //Calc area for each alignment
        let alignment = [];
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

        let isAligned = false;
        let newZoom;

        for (let i = 0; i < 3 && isAligned === false; i++) {
          let curAli = alignment[i];

          if (
            curAli.placement === "left" &&
            curAli.order === "width" &&
            curAli.height < leftHeight
          ) {
            let scaleFactor = leftWidth / nhoodWidth;
            newZoom = fitZoom * scaleFactor;

            panOffset.x = -(infoWidth / 2);
            panOffset.y = 0;

            isAligned = true;
          }

          if (
            curAli.placement === "left" &&
            curAli.order === "height" &&
            curAli.width < leftWidth
          ) {
            let scaleFactor = leftHeight / nhoodHeight;
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
            let scaleFactor = bottomWidth / nhoodWidth;
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
            let scaleFactor = bottomHeight / nhoodHeight;
            newZoom = fitZoom * scaleFactor;

            panOffset.x = 0;
            panOffset.y = infoHeight / 2;

            isAligned = true;
          }
        }

        this.cy.zoom(newZoom);
        this.cy.center(nhood);
        let centerPan = Object.assign({}, this.cy.pan());

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
    this.unspreadNodes();
  }

  componentDidMount() {
    let graphP = data.getGraphP();
    let styleP = data.getStyleP();

    let typesP = data.getFilterNames();

    Promise.all([graphP, styleP, typesP]).spread(this.initCy);
  }

  initCy(graph, style, types) {
    this.setState({
      ...this.state,
      loading: false
    });
    this.cy = cytoscape({
      container: this.cyDiv.current,
      elements: graph,
      wheelSensitivity: 0.5
    });

    this.props.cytoscapeStore.specialTypes = types.filter(
      type => !["key", "border", "person", "collab"].includes(type)
    );

    //styleMaster is a placeholder object with options for colorScheme selection,
    //and override for foreground, background, highlight, and lowlight color variables
    //as well as override for the color of nodes, and the name they should be referred to in the key
    //ideally this object should eventually be parsed from a csv
    //temp {
    let nodeOverrides = [];
    this.props.cytoscapeStore.specialTypes.forEach(type => {
      nodeOverrides.push({
        label: type,
        subtype: [type],
        color: "",
        shape: "ring"
      });
    });
    let styleMaster = {
      colorScheme: 0, // num 0 - 3, selects one of 4 color schemes from an array defined in Colors.json(see Colors.pdf for visual guide)
      //color overrides for css and cycss variables
      //accepts only hex color values (#fff) empty and faulty field will use defined in the selected colorscheme
      fg: "", //foreground color : text, tickboxes, logo etc
      bg: "", //background color
      hl: "", //highlight color : tooltip, html links, scrollbar hover etc
      ll: "", //lowlight color : greyed out text, dropshadows, scrollbar track etc
      //nodeOverride, can override automatic styling and labels (addkey) for nodes
      // can be done by type(person, project, school) or subtype/role(Hounours Student, Academic Staff, etc)
      nodeOverride: nodeOverrides
    };

    this.styleList = Style.parseStyles(
      this.cy.nodes('[type != "key"][type != "border"]'),
      color,
      styleMaster,
      style
    );
    this.cy.style(this.styleList.stylesheet);

    this.addKey();

    this.cy.on("mouseover", "node", e => {
      this.setState({
        ...this.state,
        cursor: "cy_pointer"
      });
      this.hoverLight(e.target);
      this.props.cytoscapeStore.hoveredNode = e.target.data("id");
    });

    this.cy.on("mouseout", "node", e => {
      this.setState({
        ...this.state,
        cursor: "cy_default"
      });
      this.hoverNight(e.target);
      this.props.cytoscapeStore.hoveredNode = null;
    });

    this.cy.on("select", "node", e => {
      this.props.cytoscapeStore.selectedNode = e.target.data("id");
    });

    this.cy.on("unselect", "node", e => {
      this.props.cytoscapeStore.selectedNode = null;
    });

    this.cy.on("zoom", () => {
      this.setLabels();
    });

    this.cy.ready(() => {
      Layout.cy = this.cy;
      Layout.specialTypes = this.props.cytoscapeStore.specialTypes;
      this.props.cytoscapeStore.layouts = ProjectLayout.getLayout();

      autorun(() => {
        this.props.cytoscapeStore.layouts.forEach(layout => {
          layout.run();
        });
        this.arrangeKey();
        this.cy.fit(50);
        this.setVisNodes();
      });

      autorun(() => {
        this.clear();
        if (this.props.cytoscapeStore.selectedNode === null) {
          this.fitAll();
        } else {
          let nhood = this.highlight(
            this.cy.$id(this.props.cytoscapeStore.selectedNode)
          );
          this.reframe(nhood);
        }
        this.setLabels();
      });
    });
  }

  render() {
    if (this.state.loading)
      return (
        <div id="loading">
          <FontAwesomeIcon icon={faSync} spin />
        </div>
      );
    return <div ref={this.cyDiv} className={this.state.cursor} id="cy" />;
  }
}

export default observer(Cytoscape);

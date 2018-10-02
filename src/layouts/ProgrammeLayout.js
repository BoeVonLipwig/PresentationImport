import Layout from "./Layout";

class ProgrammeLayout extends Layout {
  static focusNodes;
  static focusNum;
  static schoolRadius;
  static projectRadius;
  static schoolBB;
  static maxClusterSize;

  static spreadFocusNodes(forceRadius) {
    this.schoolBB.w = 0;
    this.schoolBB.h = 0;
    let mSC = 0;

    this.focusNodes.forEach(function(ele) {
      let node = ele;
      let nhood = node.closedNeighborhood();
      let npos = node.position();

      let radius = Layout.circleRadius(nhood.nodes('[type = "person"]'));
      let minRad = 50;

      if (forceRadius) {
        radius = forceRadius;
      }

      if (radius < minRad) {
        radius = minRad;
      }

      let layout = nhood.nodes('[type = "person"]').layout({
        name: "circle",
        avoidOverlap: false,
        padding: Layout.layoutPadding,
        boundingBox: {
          x1: npos.x - radius,
          y1: npos.y - radius,
          w: radius * 2,
          h: radius * 2
        },
        radius: radius,
        nodeDimensionsIncludeLabels: false,
        sort: Layout.sortBy("normal")
      });
      layout.run();
      ele.data("clusterSize", radius * 2);
      if (mSC < ele.data("clusterSize")) {
        mSC = ele.data("clusterSize");
      }
    });
  }

  static determineNonFocusGroup(focus) {
    if (focus === "school") {
      return "project";
    } else if (focus === "project") {
      return "school";
    }
    console.log("failed focus check");
    return "project";
  }

  static init(focus) {
    this.cy
      .elements()
      .selectify()
      .grabify();

    let nonFocus = this.determineNonFocusGroup(focus);
    let nonFocusString = '[type = "' + nonFocus + '"]';
    let focusString = '[type = "' + focus + '"]';
    let elesFilter = this.cy.elements(nonFocusString);

    this.focusNodes = this.cy.nodes(focusString);

    let activePeople = this.cy
      .nodes(focusString)
      .closedNeighborhood()
      .nodes('[type = "person"]');
    let nonActivePeople = this.cy.nodes('[type = "person"]').not(activePeople);

    let emptyFocusNodes = this.focusNodes.filter(function(ele) {
      return (
        ele
          .closedNeighborhood()
          .nodes('[type = "person"]')
          .size() < 1
      );
    });

    this.focusNodes = this.cy.nodes(focusString).not(emptyFocusNodes);

    this.focusNum = this.focusNodes.size();
    let sn = this.focusNodes.size();

    elesFilter = elesFilter.add(nonActivePeople);
    elesFilter.addClass("filtered");

    this.schoolBB = { w: 0, h: 0 };
    this.maxClusterSize = 0;

    this.spreadFocusNodes();

    this.projectRadius = this.circleRadius(this.cy.nodes(nonFocusString));

    this.schoolRadius = this.circleRadius(
      this.focusNodes,
      this.maxClusterSize,
      200
    );

    if (
      this.schoolRadius <
      this.projectRadius + this.maxClusterSize / 2 + 200
    ) {
      this.schoolRadius = this.projectRadius + this.maxClusterSize / 2 + 200;
    }

    this.focusNodes = this.focusNodes.sort(function(a, b) {
      return a.closedNeighborhood().size() - b.closedNeighborhood().size();
    });

    this.focusNodes.forEach(function(node, f) {
      let i = f + 1;
      let order =
        Math.ceil(sn / 2) -
        ((i % 2) * -2 + 1) * (Math.ceil(sn / 2) - Math.ceil(i / 2));
      node.data("order", order);
    });

    // let hiddenNodes = this.cy.nodes().not(this.focusNodes);
    // hiddenNodes.addClass("filtered");
  }

  static getLayout() {
    let focus = "school";
    let nonFocus = this.determineNonFocusGroup(focus);

    this.clearStyles();
    this.init(focus);
    let focuslayout = this.cy.elements('[type = "' + focus + '"]').layout({
      name: "circle",
      avoidOverlap: false,
      padding: this.layoutPadding,
      startAngle:
        ((Math.PI * 2) / this.focusNodes.size() / 2) * (this.focusNum % 2) +
        Math.PI / 2,
      boundingBox: {
        x1: 0 - this.schoolRadius,
        y1: 0 - this.schoolRadius,
        w: this.schoolRadius * 2,
        h: this.schoolRadius * 2
      },
      radius: this.schoolRadius,
      nodeDimensionsIncludeLabels: false,
      sort: function(a, b) {
        return a.data("order") - b.data("order");
      }
    });
    let nonfocuslayout = this.cy.nodes('[type = "' + nonFocus + '"]').layout({
      name: "circle",
      avoidOverlap: false,
      padding: this.layoutPadding,
      boundingBox: {
        x1: 0 - this.projectRadius,
        y1: 0 - this.projectRadius,
        w: this.projectRadius * 2,
        h: this.projectRadius * 2
      },
      radius: this.projectRadius,
      nodeDimensionsIncludeLabels: false
    });

    nonfocuslayout.run();
    focuslayout.run();

    this.spreadFocusNodes(this.maxClusterSize / 2);

    return [focuslayout, nonfocuslayout];
  }
}

export default ProgrammeLayout;

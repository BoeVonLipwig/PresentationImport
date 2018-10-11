import Layout from "./Layout";

class ProgrammeLayout extends Layout {
  static schoolNodes;
  static schoolNum;
  static schoolRadius;
  static projectRadius;
  static schoolBB;
  static maxClusterSize;

  static spreadSchools(forceRadius) {
    this.schoolBB.w = 0;
    this.schoolBB.h = 0;
    let mSC = 0;

    this.schoolNodes.forEach(function(ele) {
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

  static init() {
    this.cy
      .elements()
      .selectify()
      .grabify();

    let elesHide = this.cy.elements('edge[type = "collab"]');
    let elesFilter = this.cy.elements('[type = "null"]');

    this.schoolNodes = this.cy.nodes('[type = "school"]');

    let emptySchoolNodes = this.schoolNodes.filter(function(ele) {
      return (
        ele
          .closedNeighborhood()
          .nodes('[type = "person"]')
          .size() < 1
      );
    });

    this.schoolNodes = this.cy.nodes('[type = "school"]').not(emptySchoolNodes);

    this.schoolNum = this.schoolNodes.size();
    let sn = this.schoolNodes.size();

    elesFilter = elesFilter.add(emptySchoolNodes);

    elesHide.addClass("hidden");
    elesFilter.addClass("filtered");
    elesHide.unselectify().ungrabify();

    elesHide.position({
      x: this.cy.width() / 2,
      y: -50
    });

    this.schoolBB = { w: 0, h: 0 };
    this.maxClusterSize = 0;

    this.spreadSchools();

    this.projectRadius = this.circleRadius(this.cy.nodes('[type = "project"]'));

    this.schoolRadius = this.circleRadius(
      this.schoolNodes,
      this.maxClusterSize,
      200
    );

    if (
      this.schoolRadius <
      this.projectRadius + this.maxClusterSize / 2 + 200
    ) {
      this.schoolRadius = this.projectRadius + this.maxClusterSize / 2 + 200;
    }

    this.schoolNodes = this.schoolNodes.sort(function(a, b) {
      return a.closedNeighborhood().size() - b.closedNeighborhood().size();
    });

    this.schoolNodes.forEach(function(node, f) {
      let i = f + 1;
      let order =
        Math.ceil(sn / 2) -
        ((i % 2) * -2 + 1) * (Math.ceil(sn / 2) - Math.ceil(i / 2));
      node.data("order", order);
    });
  }

  static getLayout() {
    this.clearStyles();
    this.init();
    let schoolLayout = this.cy.elements('[type = "school"]').layout({
      name: "circle",
      avoidOverlap: false,
      padding: this.layoutPadding,
      startAngle:
        ((Math.PI * 2) / this.schoolNodes.size() / 2) * (this.schoolNum % 2) +
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
    let projectLayout = this.cy.nodes('[type = "project"]').layout({
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

    projectLayout.run();
    schoolLayout.run();

    this.spreadSchools(this.maxClusterSize / 2);

    return [schoolLayout, projectLayout];
  }
}

export default ProgrammeLayout;

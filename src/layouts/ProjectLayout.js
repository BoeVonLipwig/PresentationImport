import Layout from "./Layout";

class ProjectLayout extends Layout {
  static activePeople;
  static projectLayout;

  static init() {
    let elesHide = Layout.cy.elements(
      'edge[type = "collab"], [type = "school"]'
    );
    let elesFilter = Layout.cy.elements('edge[type = "collab"]');

    this.activePeople = Layout.cy
      .nodes('[type = "project"]')
      .closedNeighborhood()
      .nodes('[type = "person"]');
    let nonActivePeople = Layout.cy
      .nodes('[type = "person"]')
      .not(this.activePeople);

    this.projectLayout = Layout.cy.nodes('[type = "project"]');

    let emptySchoolNodes = Layout.cy
      .elements('[type = "school"]')
      .filter(function(ele) {
        return (
          ele
            .closedNeighborhood()
            .nodes('[type = "person"]')
            .size() < 1
        );
      });

    elesFilter = elesFilter.add(nonActivePeople);
    elesFilter = elesFilter.add(emptySchoolNodes);
    elesHide.addClass("hidden");
    elesFilter.addClass("filtered");

    let paddedHeight = Layout.cy.height() - Layout.layoutPadding * 2;

    if (
      Layout.cy
        .filter(function(ele) {
          return ele.selected();
        })
        .anySame(nonActivePeople) == true
    ) {
      Layout.cy.elements('[type = "school"]').addClass("filtered");
      // Layout.cy.$(':selected').removeClass('filtered').addClass('hidden')
    }

    let personRadius = Layout.circleRadius(this.activePeople) * 2;
    let projectRadius =
      Layout.circleRadius(Layout.cy.nodes('[type = "project"]')) * 2;

    if (projectRadius < personRadius + 250) {
      projectRadius = personRadius + 250;
    }
  }

  static getLayout() {
    if (this.activePeople == null) this.init();
    console.log("hiya");
    Layout.clearStyles();
    Layout.cy.nodes().positions({ x: 0, y: 0 });

    let personRadius = 1000;
    return this.activePeople.layout({
      name: "circle",
      avoidOverlap: false,
      padding: Layout.layoutPadding,
      startAngle: 0,
      sweep: Math.PI,
      boundingBox: {
        x1: 0 - personRadius,
        y1: 0 - personRadius,
        w: personRadius * 2,
        h: personRadius * 2
      },
      radius: personRadius,
      nodeDimensionsIncludeLabels: false,
      sort: function(a, b) {
        let orderA = 0;
        let orderB = 0;

        if (a.data("role") == "Academic Staff") {
          orderA = 1;
        } else if (a.data("role") == "Professional Staff") {
          orderA = 2;
        } else {
          orderA = 3;
        }

        if (b.data("role") == "Academic Staff") {
          orderB = 1;
        } else if (b.data("role") == "Professional Staff") {
          orderB = 2;
        } else {
          orderB = 3;
        }

        return orderA - orderB;
      }
    });
  }
}

export default ProjectLayout;

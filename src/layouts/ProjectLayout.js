import Layout from "./Layout";

class ProjectLayout extends Layout {
  static activePeople;
  static projects;
  static personRadius;
  static projectRadius;

  static init() {
    this.cy
      .elements()
      .selectify()
      .grabify();
    let elesHide = this.cy.elements('edge[type = "collab"], [type = "school"]');
    let elesFilter = this.cy.elements('edge[type = "collab"]');

    this.activePeople = this.cy
      .nodes('[type = "project"]')
      .closedNeighborhood()
      .nodes('[type = "person"]');
    let nonActivePeople = this.cy
      .nodes('[type = "person"]')
      .not(this.activePeople);

    this.projects = this.cy.nodes('[type = "project"]');

    let emptySchoolNodes = this.cy
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
    elesHide.unselectify().ungrabify();

    if (
      this.cy
        .filter(function(ele) {
          return ele.selected();
        })
        .anySame(nonActivePeople) === true
    ) {
      this.cy.elements('[type = "school"]').addClass("filtered");
      // this.cy.$(':selected').removeClass('filtered').addClass('hidden')
    }

    this.personRadius = this.circleRadius(this.activePeople) * 2;
    this.projectRadius =
      this.circleRadius(this.cy.nodes('[type = "project"]')) * 2;

    if (this.projectRadius < this.personRadius + 250) {
      this.projectRadius = this.personRadius + 250;
    }
  }

  static getLayout() {
    this.clearStyles();
    this.cy.nodes().positions({ x: 0, y: 0 });
    this.init();

    return [
      this.activePeople.layout({
        name: "circle",
        avoidOverlap: false,
        padding: this.layoutPadding,
        startAngle: 0,
        sweep: Math.PI,
        boundingBox: {
          x1: 0 - this.personRadius,
          y1: 0 - this.personRadius,
          w: this.personRadius * 2,
          h: this.personRadius * 2
        },
        radius: this.personRadius,
        nodeDimensionsIncludeLabels: false,
        sort: this.sortBy("normal")
      }),
      this.projects.layout({
        name: "circle",
        avoidOverlap: false,
        padding: this.layoutPadding,
        startAngle: 0,
        sweep: Math.PI,
        boundingBox: {
          x1: 0 - this.projectRadius,
          y1: 0 - this.projectRadius,
          w: this.projectRadius * 2,
          h: this.projectRadius * 2
        },
        radius: this.projectRadius,
        nodeDimensionsIncludeLabels: false
      })
    ];
  }
}

export default ProjectLayout;

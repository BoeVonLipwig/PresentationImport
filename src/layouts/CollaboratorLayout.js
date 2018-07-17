import Layout from "./Layout";

class CollaboratorLayout extends Layout {
  static getLayout() {
    this.cy
      .elements()
      .selectify()
      .grabify();

    this.clearStyles();
    let elesHide = this.cy.elements('[type = "project"], [type = "school"]');
    let elesFilter = this.cy.elements('[type = "project"]');

    let activePeople = this.cy.nodes('[type = "project"]').closedNeighborhood();
    let nonActivePeople = this.cy.nodes('[type = "person"]').not(activePeople);
    elesFilter = elesFilter.add(nonActivePeople);

    elesHide.addClass("hidden");
    elesFilter.addClass("filtered");
    elesHide.unselectify().ungrabify();

    let people = activePeople.nodes('[type = "person"]');

    let layout = people.layout({
      name: "circle",
      avoidOverlap: false,
      padding: this.layoutPadding,
      radius: this.circleRadius(people),
      nodeDimensionsIncludeLabels: false,
      sort: this.sortBy("reverse")
    });

    layout.run();

    this.cy
      .nodes()
      .not(people)
      .position({
        x: this.cy.width() / 2,
        y: this.cy.height() / 2
      });

    // addKey.arrange();
    // this.cy.$(":selected").forEach(highlight);

    return [layout];
  }
}

export default CollaboratorLayout;

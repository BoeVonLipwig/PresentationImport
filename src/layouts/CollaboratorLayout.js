import Layout from "./Layout";

class CollaboratorLayout extends Layout {
  static getLayout() {
    this.cy
      .elements()
      .selectify()
      .grabify();

    this.clearStyles();
    let specialFilter = this.specialTypes
      .map(type => `[type = '${type}']`)
      .join(",");
    let elesHide = this.cy.elements(specialFilter);
    let elesFilter = this.cy.elements(specialFilter);

    let activePeople = this.cy.edges('[type = "collab"]').connectedNodes();
    let nonActivePeople = this.cy.nodes('[type = "person"]').not(activePeople);
    elesFilter = elesFilter.add(nonActivePeople);

    elesHide.addClass("hidden");
    elesFilter.addClass("filtered");
    elesHide.unselectify().ungrabify();
    let layout = activePeople.layout({
      name: "circle",
      avoidOverlap: false,
      padding: this.layoutPadding,
      radius: this.circleRadius(activePeople),
      nodeDimensionsIncludeLabels: false,
      sort: this.sortBy("reverse")
    });

    layout.run();

    this.cy
      .nodes()
      .not(activePeople)
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

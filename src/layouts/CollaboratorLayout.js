import Layout from "./Layout";

class CollaboratorLayout extends Layout {
  static getLayout() {
    this.learStyles();
    var elesHide = this.cy.elements('[type = "project"], [type = "school"]');
    var elesFilter = this.cy.elements('[type = "project"]');

    var activePeople = this.cy.nodes('[type = "project"]').closedNeighborhood();
    var nonActivePeople = this.cy.nodes('[type = "person"]').not(activePeople);
    elesFilter = elesFilter.add(nonActivePeople);

    elesHide.addClass("hidden");
    elesFilter.addClass("filtered");

    var people = activePeople.nodes('[type = "person"]');

    var layout = people.layout({
      name: "circle",
      avoidOverlap: false,
      // padding: layoutPadding,
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

    return { name: "breadthfirst" };
  }

  addCollab() {
    this.cy.nodes('[type = "project"]').forEach(function(projectNode) {
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
}

export default CollaboratorLayout;

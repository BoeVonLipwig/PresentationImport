class Layout {
  static layoutPadding = 50;
  static cy;

  static clearStyles() {
    console.log(this.cy);
    this.cy.elements().removeClass("filtered");
    this.cy.elements().removeClass("hidden");
    this.cy.elements().removeClass("highlighted");
    this.cy.edges().unselect();
  }

  static circleRadius(collection, nodeSize = 30, padding = 25) {
    var circum = collection.size() * nodeSize + collection.size() * padding;
    return circum / (2 * Math.PI);
  }
}

export default Layout;

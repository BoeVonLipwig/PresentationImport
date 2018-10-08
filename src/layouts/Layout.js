import Style from "../components/StyleCytoscape";
class Layout {
  static layoutPadding = 50;
  static cy;
  static specialTypes;

  static clearStyles() {
    this.cy.elements().removeClass("filtered");
    this.cy.elements().removeClass("hidden");
    this.cy.elements().removeClass("highlighted");
    this.cy.edges().unselect();
  }

  static circleRadius(collection, nodeSize = 30, padding = 25) {
    let circum = collection.size() * nodeSize + collection.size() * padding;
    return circum / (2 * Math.PI);
  }

  static sortBy(arg) {
    return function(a, b) {
      return Style.sortBySubType(a, b); //no reverse option
    };
  }
}

export default Layout;

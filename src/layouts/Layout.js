import Style from "../components/Style";
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
    let circum = collection.size() * nodeSize + collection.size() * padding;
    return circum / (2 * Math.PI);
  }

  static sortBy(arg) {
    // let order = [1, 2, 3];
    // if (arg === "reverse") {
    //   order = order.reverse();
    // }
    return function(a, b) {
      // var orderA = 0;
      // var orderB = 0;

      // if (a.data("role") === "Academic Staff") {
      //   orderA = order[0];
      // } else if (a.data("role") === "Professional Staff") {
      //   orderA = order[1];
      // } else {
      //   orderA = order[2];
      // }

      // if (b.data("role") === "Academic Staff") {
      //   orderB = order[0];
      // } else if (b.data("role") === "Professional Staff") {
      //   orderB = order[1];
      // } else {
      //   orderB = order[2];
      // }

      // return orderA - orderB;
      return Style.sortBySubType(a, b); //no reverse option
    };
  }
}

export default Layout;

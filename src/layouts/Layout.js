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

  static sortBy(arg) {
    if (arg === "reverse") {
      return function(a, b) {
        var orderA = 0;
        var orderB = 0;

        if (a.data("role") == "Academic Staff") {
          orderA = 3;
        } else if (a.data("role") == "Professional Staff") {
          orderA = 2;
        } else {
          orderA = 1;
        }

        if (b.data("role") == "Academic Staff") {
          orderB = 3;
        } else if (b.data("role") == "Professional Staff") {
          orderB = 2;
        } else {
          orderB = 1;
        }

        return orderA - orderB;
      };
    } else {
      return function(a, b) {
        var orderA = 0;
        var orderB = 0;

        if (a.data("role") == "Academic Staff") {
          orderA = 3;
        } else if (a.data("role") == "Professional Staff") {
          orderA = 2;
        } else {
          orderA = 1;
        }

        if (b.data("role") == "Academic Staff") {
          orderB = 3;
        } else if (b.data("role") == "Professional Staff") {
          orderB = 2;
        } else {
          orderB = 1;
        }

        return orderA - orderB;
      };
    }
  }
}

export default Layout;

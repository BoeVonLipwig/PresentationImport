class LayoutFactory {
  static projectsLayout = { name: "concentric" };
  static programmeLayout = { name: "circle" };
  static collaboratorsLayout = { name: "breadthfirst" };

  static computeLayout(l) {
    switch (l) {
      case "showProjects":
        return this.projectsLayout;
      case "showSchools":
        return this.programmeLayout;
      case "showCollab":
        return this.collaboratorsLayout;

      default:
        return { name: "grid" };
    }
  }
}

export default LayoutFactory;

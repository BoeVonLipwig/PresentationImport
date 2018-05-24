class LayoutFactory {
  projectsLayout() {
    return { name: "concentric" };
  }

  programmeLayout() {
    return { name: "circle" };
  }

  collaboratorsLayout() {
    return { name: "breadthfirst" };
  }

  static computeLayout(l) {
    if (l === "showProjects") {
      return this.projectsLayout();
    } else if (l === "showSchools") {
      return this.programmeLayout();
    } else if (l === "showCollab") {
      return this.collaboratorsLayout();
    }

    // default layout if failed to read input
    return { name: "grid" };
  }
}

export default LayoutFactory;

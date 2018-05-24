class LayoutFactory {
  static computeLayout(l) {
    if (l === "showProjects") {
      return projectsLayout();
    } else if (l === "showSchools") {
      return programmeLayout();
    } else if (l === "showCollab") {
      return collaboratorsLayout();
    }

    // default layout if failed to read input
    return { name: "breadthfirst" };
  }

  projectsLayout() {}

  programmeLayout() {}

  collaboratorsLayout() {}
}

import ProjectLayout from "../layouts/ProjectLayout";
import ProgrammeLayout from "../layouts/ProgrammeLayout";
import CollaboratorLayout from "../layouts/CollaboratorLayout";

class LayoutFactory {
  static projectLayout(focus) {
    return ProjectLayout.getLayout(focus);
  }

  static programmeLayout(focus) {
    return ProgrammeLayout.getLayout(focus);
  }

  static collaboratorLayout(focus) {
    return CollaboratorLayout.getLayout(focus);
  }

  static computeLayout(l, f) {
    switch (l) {
      case "showSegment":
        return this.projectLayout(f);
      case "showCircles":
        return this.programmeLayout(f);
      case "showCollab":
        return this.collaboratorLayout(f);

      default:
        return { name: "grid" };
    }
  }
}

export default LayoutFactory;

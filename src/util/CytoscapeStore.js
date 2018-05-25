import { observable, decorate } from "mobx";
import ProjectLayout from "../layouts/ProjectLayout";

class CytoscapeStore {
  layouts = null;
}
decorate(CytoscapeStore, {
  layouts: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

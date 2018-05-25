import { observable, decorate } from "mobx";
import ProjectLayout from "../layouts/ProjectLayout";

class CytoscapeStore {
  layout = null;
}
decorate(CytoscapeStore, {
  layout: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

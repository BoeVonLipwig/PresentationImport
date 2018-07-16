import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  view = "showProjects";
  node = null;
  nhood = null;
  details = true;
}
decorate(CytoscapeStore, {
  layouts: observable,
  view: observable,
  node: observable,
  details: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

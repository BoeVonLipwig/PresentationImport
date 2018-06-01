import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
  node = null;
}
decorate(CytoscapeStore, {
  layouts: observable,
  node: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

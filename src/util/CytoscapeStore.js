import { observable, decorate } from "mobx";

class CytoscapeStore {
  layout = { name: "concentric" };
  node = null;
}
decorate(CytoscapeStore, {
  layout: observable,
  node: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

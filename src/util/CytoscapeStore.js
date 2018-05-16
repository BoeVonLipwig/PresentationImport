import { observable, decorate } from "mobx";

class CytoscapeStore {
  layout = { name: "concentric" };
}
decorate(CytoscapeStore, {
  layout: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

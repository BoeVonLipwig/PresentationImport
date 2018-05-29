import { observable, decorate } from "mobx";

class CytoscapeStore {
  layouts = null;
}
decorate(CytoscapeStore, {
  layouts: observable
});

const cytoscapeStore = new CytoscapeStore();

export default cytoscapeStore;

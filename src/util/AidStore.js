import { observable, decorate } from "mobx";

class AidStore {
  aids = {
    views: { display: "" },
    details: { display: "" },
    search: { display: "" },
    contact: { display: "" }
  };
}
decorate(AidStore, {
  aids: observable
});

const aidStore = new AidStore();

export default aidStore;

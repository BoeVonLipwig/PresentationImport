import loadData from "../util/data";
import Promise from "bluebird";

class NetworkRequest {
  constructor() {
    this.graphP = loadData();
    this.styleP = fetch("data.cycss").then(x => {
      return x.text();
    });
  }

  getGraphP() {
    return this.graphP;
  }

  getStyleP() {
    return this.SytleP;
  }
}

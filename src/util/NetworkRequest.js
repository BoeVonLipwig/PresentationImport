import loadData from "../util/data";

// This class gets the data and stores it to be called by cytoscape
class NetworkRequest {
  constructor() {
    //this.graphP = loadData();
    loadData().then(data => console.log(data));
    this.graphP = fetch("output.json").then(response => response.json());
    fetch("output.json").then(response =>
      response.json().then(data => console.log(data))
    );

    this.styleP = fetch("data.cycss").then(x => {
      return x.text();
    });
  }

  getGraphP() {
    return this.graphP;
  }

  getStyleP() {
    return this.styleP;
  }
}

const networkRequest = new NetworkRequest();

export default networkRequest;

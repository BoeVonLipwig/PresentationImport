// This class gets the data and finds name filters for cytoscape
class DataFilter {
  parseElementsToGetFilterNames(graphP) {
    let filterNames = graphP.then(graphData => {
      let set = new Set();
      for (let i = 0; i < graphData.length; i++) {
        let dataInstance = graphData[i];
        set.add(dataInstance.data.type);
      }
      return [...set];
    });
    return filterNames;
  }
}

const datafilter = new DataFilter();

export default datafilter;

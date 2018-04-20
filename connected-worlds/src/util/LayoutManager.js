class LayoutManager {
  static getLayout(layout) {
    //TODO
    return { name: "concentric" };
  }

  static set(graph, layout) {
    graph.on("ready", () => {
      graph.layout(this.getLayout(layout)).run();
    });
  }
}

export default LayoutManager;

import "./Index.css";
import React from "react";
import App from "./App";
import registerServiceWorker from "./RegisterServiceWorker";
import { hydrate, render } from "react-dom";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

registerServiceWorker();

import React, { Fragment } from "react";
import { observer } from "mobx-react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./VideoHelp.css";

class VideoHelp extends React.Component {
  clickHandler = () => {
    cytoscapeStore.showTutorial = false;
  };

  renderVideo() {
    return (
      <div className="helpVideoWrapper">
        <iframe
          title="Youtube Video"
          src="https://www.youtube.com/embed/Wv2WjIAPMFI"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  render() {
    if (!cytoscapeStore.showTutorial) {
      return null;
    }
    return (
      <div id="videoBackground" onClick={this.clickHandler}>
        <Fragment> {this.renderVideo()}</Fragment>
      </div>
    );
  }
}

export default observer(VideoHelp);

import React, { Fragment } from "react";
import { observer } from "mobx-react";
import cytoscapeStore from "../util/CytoscapeStore";
import "./VideoHelp.css";

class VideoHelp extends React.Component {
  clickHandler = (e, type) => {
    cytoscapeStore.showTutorial = false;
  };

  renderVideo() {
    return (
      <div className="helpVideoWrapper">
        <iframe
          title="Youtube Video"
          src="https://www.youtube.com/embed/ScMzIvxBSi4"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
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

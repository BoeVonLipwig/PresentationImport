import React from "react";
import cytoscapeStore from "../util/CytoscapeStore"

class NodeInfo extends React.Component {
	
	render() {
		let node = cytoscapeStore.node
		return (<div>{this.nodeData(node)}</div>);
	}
	
	nodeData(node) {
		let infoTitle = node.data('name');
		let brief = node.data('brief');
		let infoSchool = node.data('school');
		let mediaLink = node.data('mediaLink');
		let siteLink = node.data('siteLink');
		let staffSiteLink = node.data('staffSiteLink');
		let siteName = !node.data('siteName') ? node.data('siteName') : node.data('name');
		let nodeType = node.data('type');
		let role = node.data('role');
		let datesActive = node.data('datesActive');
		
		
		if (!mediaLink && nodeType === "person") {
			mediaLink = 'assets/id-img.png';
		}
		
		
		return (
			<div class="info-row">
				<hr/>
				<p class="info-brief">{brief}</p>
			</div>
		);
	}
	
}

export default NodeInfo;
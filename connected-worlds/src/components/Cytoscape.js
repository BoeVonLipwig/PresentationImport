import React from 'react';
import cytoscape from 'cytoscape';

class Cytoscape extends React.Component {
  constructor() {
    super();
    this.cyDiv = React.createRef();
  }

  componentDidMount() {
    let cy = cytoscape({
      container: this.cyDiv.current,
      elements: [],
      wheelSensitivity: 0.5
    });

    for (let i = 0; i < 10; i++) {
      let source = 'node' + i;

      cy.add({
        data: { id: source }
      });

      if (i > 0) {
        cy.add({
          data: {
            id: 'edge' + i + (i - 1),
            source: source,
            target: 'node' + (i - 1)
          }
        });
      }
    }

    cy.add({
      data: {
        id: 'edgy',
        source: 'node' + 9,
        target: 'node' + 0
      }
    });
  }

  render() {
    return <div ref={this.cyDiv} id="cy" />;
  }
}

export default Cytoscape;

import React from 'react';

class SelectButton extends React.Component {
  render() {
    return (
      <div class="control">
        <div class="checkbox-round">
          <input id={this.props.id} type="checkbox" />
          <label for={this.props.id} />
        </div>

        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SelectButton;

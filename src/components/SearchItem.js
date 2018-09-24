import React from "react";

class SearchItem extends React.Component {
  render() {
    return (
      <li className="ui-menu-item">
        <div
          className="ui-menu-item-wrapper"
          onMouseEnter={() => this.props.onHover(this.props.item)}
          onMouseLeave={this.props.onUnHover}
          onClick={() => this.props.onSelect(this.props.item)}
        >
          {this.props.item.name}
        </div>
      </li>
    );
  }
}

export default SearchItem;

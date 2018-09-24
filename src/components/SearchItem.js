import React from "react";
import "./SearchItem.css";

function SearchItem(props) {
  return (
    <li className="ui-menu-item">
      <div
        className="ui-menu-item-wrapper"
        onMouseEnter={() => props.onHover(props.item)}
        onMouseLeave={props.onUnHover}
        onClick={() => props.onSelect(props.item)}
      >
        {props.item.name}
      </div>
    </li>
  );
}

export default SearchItem;

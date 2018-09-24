import React from "react";
import SearchItem from "./SearchItem";
import "./SearchResults.css";

function SearchResults(props) {
  if (!props.results || props.results.length === 0) return null;
  const results = props.results;
  const listItems = results.map(result => (
    <SearchItem
      key={result.id}
      item={result}
      onHover={props.onHover}
      onUnHover={props.onUnHover}
      onSelect={props.onSelect}
    />
  ));
  return props.displayed ? (
    <ul className="ui-menu ui-widget ui-widget-content ui-autocomplete suggestion-menu ui-front">
      {listItems}
    </ul>
  ) : null;
}

export default SearchResults;

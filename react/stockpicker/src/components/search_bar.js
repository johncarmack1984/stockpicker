import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
//var requireFromUrl = require('require-from-url/sync');



// import json for autocomplete
const tickerNamePairs = require('../resources/ticker_name_pairs.json');
//const tickerNamePairs = requireFromUrl("https://spio-middleware-resources.s3.amazonaws.com/ticker_name_pairs.json");

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');

  return (tickerNamePairs.filter(tickerNamePair => regex.test(tickerNamePair.string)));

}

function getSuggestionValue(suggestion) {
  return suggestion.ticker;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.string}</span>
  );
}

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleClearClick = this.handleClearClick.bind(this);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  handleClearClick() {
    this.setState({
      value: '',
    });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Add stock...",
      value,
      onChange: this.onChange,
    };

    let clearButton;
    if (value.length >= 1) {
      clearButton = (<i className="close-icon ion-close-circled" onClick={this.handleClearClick}></i>);
    }

    return (
      <div className="row sidebar-search">
        <span className="sidebar-search-field">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
            alwaysRenderSuggestions={false}
          />
          <span className="close-icon-container">
            {clearButton}
          </span>
        </span>
      </div>
    );
  }
}

export default SearchBar;

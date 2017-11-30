import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStockData } from '../actions/index';


import Autosuggest from 'react-autosuggest';

// import json for autocomplete
const tickerNamePairs = require('../resources/ticker_name_pairs.json');

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

    this.state = {
      value: '',
      suggestions: []
    };

    this.handleClearClick = this.handleClearClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchStockData(this.state.value, this.props.toolbarVariables.timeFrame);
    this.setState({ value: '' });
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
        <form onSubmit={this.onFormSubmit}>
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
            <button type="submit" className="sidebar-button">+</button>
          </span>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ toolbarVariables }) {
  // Whatever is returned from here will show up as props
  // inside of toolbar
  return {
    toolbarVariables,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStockData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
//import { setTimeFrame } from '../actions/index';

class SetTimeFrame extends Component {
  render() {
    return (
      <ul className="set-time-frame">
        <li><a>1W</a></li>
        <li><a>1M</a></li>
        <li><a>3M</a></li>
        <li><a>1Y</a></li>
        <li><a>5Y</a></li>
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  //return bindActionCreators({ setTimeFrame }, dispatch);
  return {}
}

export default connect(null, mapDispatchToProps)(SetTimeFrame);

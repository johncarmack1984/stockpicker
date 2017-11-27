import React, { Component } from 'react';
import { connect } from 'react-redux';

class GraphScreen extends Component {
  render () {
    return (
        <div className="col span-2-of-3">

          <br />
          <center>{this.props.stockData.length} stocks in drawer</center>
          <br />
        </div>
    );
  }
}

function mapStateToProps({ stockData }) {
  return {
    stockData,
  };
}

export default connect(mapStateToProps)(GraphScreen);

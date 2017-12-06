import React, { Component } from 'react';
import { connect } from 'react-redux';
//import _ from 'lodash';

class GraphScreen extends Component {
  render () {
    //console.log(this.props);
    return (
      <div className="main-content">
        <br />
        <center>
          {this.props.stockList.length} stocks in drawer<br />
          <br />{} space here for reselect
        </center>
        <br />
      </div>
    );
  }
}

function mapStateToProps({ stockData, stockList }) {
  //console.log(stockData)
  return {
    stockData,
    stockList
  };
}

export default connect(mapStateToProps)(GraphScreen);

import React, { Component } from 'react';

class GraphScreen extends Component {
  render () {
    return (
        <div className="col span-2-of-3">
          <br />
          <center>{this.props.data.length} stocks in drawer</center>
          <br />
        </div>
    );
  }
}

export default GraphScreen;

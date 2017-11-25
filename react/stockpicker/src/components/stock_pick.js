import React, { Component } from 'react';
//import { CSSTransitionGroup } from 'react-transition-group';
import SmoothCollapse from 'react-smooth-collapse';

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

class StockPick extends Component {
  constructor() {
      super()
      this.state = {
        showStockDetail: false,
        arrowClass: 'ion-arrow-right-b stock-arrow'
      }
    }
  toggleDetail() {
    this.setState({ showStockDetail: !this.state.showStockDetail }) /*}*/
    if (this.state.arrowClass === 'ion-arrow-right-b stock-arrow'){
      this.setState({arrowClass: 'ion-arrow-down-b stock-arrow'});
    } else {
      this.setState({arrowClass: 'ion-arrow-right-b stock-arrow'});
    }
  }
  render() {
    const StockDetail = (props) => (
        <div className="col span-2-of-2">
            <div className="small-chart row">
              <br/>
                <center>
                  time frame:{this.props.timeFrame}<br/>
                  start date:{this.props.data.start_date}
                </center>
              <br/>
            </div>
            <div className="row">
                <ul className="stock-fine-print">
                    <li>
                      logRet: {round((this.props.data.log_return*100), 2)} %
                    </li>
                    <li>
                      vol: {round((this.props.data.volatility*100), 2)} %
                    </li>
                </ul>
            </div>
        </div>

    )
    return (
      <li className="stock-pick">
        <div

          className="row stock-pick-header"
          key={this.props.ticker}>
          <span
            className="stock-pick-price">
            &nbsp;$&nbsp;{round(this.props.data.price,2)}
          </span>
          <span className="stock-pick-click">
            <a
              onClick={this.toggleDetail.bind(this)}
              title={this.props.data.ticker + ' | ' + this.props.data.name}>
              <i className={this.state.arrowClass}>&nbsp;</i>
              <span className="stock-symbol">
                {this.props.ticker}
              </span>
              <span className="stock-name">
                &nbsp;|&nbsp;{this.props.data.name}
              </span>
            </a>
          </span>
        </div>
        <div className="row stock-detail">
          <SmoothCollapse
            expanded={this.state.showStockDetail}>
            <StockDetail />
          </SmoothCollapse>
        </div>
      </li>
    );
  }
};


export default StockPick;

/*

{this.props.data.start_date}


<div >
    <input type="checkbox" className="stock-check" checked />&nbsp;
        <i className="ion-trash-a delete-button"></i>
    <a className="js--ideal-weight"><span className="ideal-weight js--ideal-weight">18&#37;</span></a>
      <span className="num-shares">1</span>





</div>
*/

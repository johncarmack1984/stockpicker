import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmoothCollapse from 'react-smooth-collapse';
//import { CSSTransitionGroup } from 'react-transition-group';
//import dotProp from 'dot-prop-immutable';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { toggleCheckBox, toggleShowStockDetail, replaceStockData, dropStockPick, dropStockData } from '../actions/index';

function round(value, decimals) {
  return (Number(Math.round(value+'e'+decimals)+'e-'+decimals));
}

class StockPick extends Component {
  constructor(props) {
      super(props)
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
      this.handleToggleDetailClick = this.handleToggleDetailClick.bind(this);
      this.handleToggleCheckBox = this.handleToggleCheckBox.bind(this);
  }

  // neccessary for componentWillUpdate()
  getInitialProps() {  }
  handleToggleCheckBox() {
    this.props.toggleCheckBox(this.props.value)
  }
  handleToggleDetailClick() {
    this.props.toggleShowStockDetail(this.props.value)
  }
  handleDeleteClick() {
    this.props.dropStockPick(this.props.ticker);
    this.props.dropStockData(this.props.ticker);
  }
  componentWillUpdate(nextProps) {
    if (nextProps.toolbarVariables.timeFrame !== this.props.toolbarVariables.timeFrame) {
      if (nextProps.stockData[nextProps.ticker][nextProps.toolbarVariables.timeFrame] === undefined) {
        this.props.replaceStockData(this.props.ticker, nextProps.toolbarVariables.timeFrame)
      }
    }
  }
  render() {
    let arrowClass;
    if (this.props.settings.showStockDetail === true) {
      arrowClass = 'ion-arrow-down-b stock-arrow'
    } else {
      arrowClass = 'ion-arrow-right-b stock-arrow'
    }

    var hasDetail = false;
    if (this.props.stockData[this.props.ticker] !== undefined) {
      hasDetail = true;
      if (this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame] !== undefined) {
        //console.log(this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame])
        //var endDate = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].end_date;
        var logReturn = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].log_return;
        var price = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].price;
        var prices = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].prices;
        //var startDate = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].start_date;
        var volatility = this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame].volatility;

      }
    }

    return (
      <div className="stock-pick">
        <div className="stock-pick-header" key={this.props.ticker}>
          <input type="checkbox" title="Include in analysis?" className="stock-check" onChange={this.handleToggleCheckBox} checked={this.props.settings.isChecked} />&nbsp;
          <span className="stock-pick-click">
            <a onClick={this.handleToggleDetailClick.bind(this)} title={`${this.props.ticker} | ${this.props.name}`}>
              &nbsp;<i className={arrowClass}></i>&nbsp;
              <span className="stock-symbol">{this.props.ticker}</span>
            </a>
          </span>
          <span className="delete-button-span" title={`Delete ${this.props.ticker} from portfolio`}><i className="ion-trash-a delete-button" onClick={this.handleDeleteClick}>&nbsp;</i></span>
          <span className="stock-pick-price" title={`${this.props.ticker} price $${price ? price : '-.--'}`}>$ {price ? price : '-.--'}</span>
        </div>
        <div className="stock-detail">
          <SmoothCollapse expanded={hasDetail}>
            <SmoothCollapse expanded={this.props.settings.showStockDetail}>
              <div className="stock-detail-container">
                <div className="small-chart" title={`$${prices ? round(prices[0],2) : 'startprice'}   -   $${prices ? round(prices.slice(-1)[0],2) : 'endprice'}`}>
                  <div className="stock-name-container">
                    <span className="stock-name">{this.props.name}</span>
                  </div>
                  <Sparklines
                    data={prices ? prices : [0,]}
                    style={{ background: "rgba( 54,  2, 78,0.9)", backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.1))", borderRadius: "5px" }}
                    margin={10}
                    height={90}>
                      <SparklinesLine style={{ stroke: "rgba(193,157, 12,0.9)", fill: "none" }} />
                      <SparklinesReferenceLine
                        type="avg"
                        style={{ stroke: 'rgba(193,157, 12,0.8)', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
                  </Sparklines>
                </div>
                <ul className="stock-fine-print">
                    <li>logRet: {logReturn ? round(logReturn*100,2) : '-.--'} %&nbsp;&nbsp;</li>
                    <li>vol: {volatility ? round(volatility*100,2) : '-.--'} %&nbsp;&nbsp;</li>
                </ul>
              </div>
            </SmoothCollapse>
          </SmoothCollapse>
        </div>
      </div>

    );
  }
};

function mapStateToProps({ stockData, stockList, toolbarVariables }) {
  return {
    stockData,
    stockList,
    toolbarVariables
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleCheckBox,
      toggleShowStockDetail,
      replaceStockData,
      dropStockPick,
      dropStockData,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPick);

/*
<div >
    <a className="js--ideal-weight"><span className="ideal-weight js--ideal-weight">18&#37;</span></a>
      <span className="num-shares">1</span>
</div>
*/

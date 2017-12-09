import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmoothCollapse from 'react-smooth-collapse';
//import { CSSTransitionGroup } from 'react-transition-group';
//import dotProp from 'dot-prop-immutable';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { toggleCheckBox, toggleShowStockDetail, dropStockPick } from '../actions/index';
//import { Record, Map } from 'immutable';

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
  }
  render() {

    let arrowClass;
    /*
    if (this.props.settings.showStockDetail === true) {
      arrowClass = 'ion-arrow-down-b stock-arrow'
    } else {
      arrowClass = 'ion-arrow-right-b stock-arrow'
    }
    */
    if (this.props.data !== undefined) {
      if (this.props.data[this.props.toolbarVariables.timeFrame] !== undefined) {
        //var endDate = this.props.data[this.props.toolbarVariables.timeFrame].end_date;
        var logReturn = this.props.data[this.props.toolbarVariables.timeFrame].log_return;
        var price = this.props.data[this.props.toolbarVariables.timeFrame].price;
        var prices = this.props.data[this.props.toolbarVariables.timeFrame].prices;
        //var startDate = this.props.data[this.props.toolbarVariables.timeFrame].start_date;
        var volatility = this.props.data[this.props.toolbarVariables.timeFrame].volatility;
      }
    }
    //console.log(this.props)
    return (
      <div className="stock-pick">
        <div className="stock-pick-header" key={this.props.ticker}>
          <input type="checkbox" title="Include in analysis?" className="stock-check" onChange={this.handleToggleCheckBox} />&nbsp;
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
          <SmoothCollapse expanded={true}>
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
        </div>
      </div>

    );
  }
};

function mapStateToProps({ stockList, toolbarVariables }) {
  return {
    stockList,
    toolbarVariables
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleCheckBox,
      toggleShowStockDetail,
      dropStockPick,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPick);

/*

checked={this.props.settings.isChecked}
expanded={this.props.settings.showStockDetail}

<div >
    <a className="js--ideal-weight"><span className="ideal-weight js--ideal-weight">18&#37;</span></a>
      <span className="num-shares">1</span>
</div>
*/

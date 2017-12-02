import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmoothCollapse from 'react-smooth-collapse';
//import { CSSTransitionGroup } from 'react-transition-group';
//import dotProp from 'dot-prop-immutable';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { fetchStockData, replaceStockData, dropStockPick, dropStockData } from '../actions/index';

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

class StockPick extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showStockPick: false,
        showStockDetail: this.props.toolbarVariables.expandAll,
        arrowClass: this.props.toolbarVariables.expandArrowClass,
        //endDate: MM-DD-YYYY,
        prices: [0,],
        logReturn: '–.--',
        price: '-.--',
        //startDate: MM-DD-YYYY,
        volatility: '-.--'
      }
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  // these two functions are neccessary for componentWillUpdate()
  getInitialProps() {  }
  getInitialState() {  }
  // handle HTTP requests & cosmetic stuff
  componentDidMount() {
    // fetch data
    this.props.fetchStockData(this.props.ticker, this.props.toolbarVariables.timeFrame);
    // open slider
    this.setState({ showStockPick: true })
  }
  handleToggleDetailClick() { this.setState({ showStockDetail: !this.state.showStockDetail }) }
  handleDeleteClick() {
    this.props.dropStockPick(this.props.ticker);
    this.props.dropStockData(this.props.ticker);
    this.setState({ showStockPick: false });
  }
  componentWillUpdate(nextProps, nextState) {
    // handle data loadingg
    // avoid an undefined error when stock data gets deleted by resetting variables
    if (nextProps.stockData[this.props.ticker] !== this.props.stockData[this.props.ticker] && nextProps.stockData[this.props.ticker] === undefined) {
      this.setState({
        //endDate: MM-DD-YYYY,
        prices: [0,],
        logReturn: '–.--',
        price: '-.--',
        //startDate: MM-DD-YYYY,
        volatility: '-.--'
      });
    } else if (nextProps.stockData[this.props.ticker] !== this.props.stockData[this.props.ticker] && nextProps.stockData[this.props.ticker] !== undefined) {
      this.setState({
        endDate: nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].end_date,
        prices: nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].prices,
        logReturn: round(nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].log_return*100,2),
        price: round(nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].price,2),
        startDate: nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].start_date,
        volatility: round(nextProps.stockData[this.props.ticker][nextProps.toolbarVariables.timeFrame].volatility*100,2)
      });

    }
    // handle timeFrame change
    if (nextProps.toolbarVariables.timeFrame !== this.props.toolbarVariables.timeFrame) {
      this.setState({
        //endDate: MM-DD-YYYY,
        //prices: [0,],
        logReturn: '–.--',
        //price: '-.--',
        //startDate: MM-DD-YYYY,
        volatility: '-.--'
      });
      this.props.replaceStockData(this.props.ticker, nextProps.toolbarVariables.timeFrame)
    }
    // handle expand/collapse all
    if (nextProps.toolbarVariables.expandAll !== this.props.toolbarVariables.expandAll) {
      if (nextProps.toolbarVariables.expandAll) {
        this.setState({ showStockDetail: true });
      } else if (!nextProps.toolbarVariables.expandAll) {
        this.setState({ showStockDetail: false });
      }
    }
    // handle ion icon status change when collapsing or expanding
    if (nextState.showStockDetail !== this.state.showStockDetail) {
      if (nextState.showStockDetail) {
        this.setState({ arrowClass: 'ion-arrow-down-b stock-arrow' });
      } else if (!nextState.showStockDetail) {
        this.setState({ arrowClass: 'ion-arrow-right-b stock-arrow' });
      }
    }
  }

  render() {
    const name = this.props.name;
    const ticker = this.props.ticker;
    const StockDetail = (props) => (
        <div className="col span-2-of-2">
            <div className="small-chart row" title={`   $${round(this.state.prices[0],2)}   -   $${this.state.prices.slice(-1)}
${this.state.startDate} - ${this.state.endDate}`}>
                <Sparklines
                  data={this.state.prices}
                  style={{
                    background: "rgba( 54,  2, 78,0.9)",
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.1))",
                    borderRadius: "5px"
                  }}
                  margin={10}
                  height={90}>
                    <SparklinesLine
                      style={{
                        stroke: "rgba(193,157, 12,0.9)",
                        fill: "none"
                      }} />
                    <SparklinesReferenceLine
                      type="avg"
                      style={{
                        stroke: 'rgba(193,157, 12,0.8)',
                        strokeOpacity: .75,
                        strokeDasharray: '2, 2'
                      }} />
                </Sparklines>
            </div>
            <div className="row">
                <ul className="stock-fine-print">
                    <li>
                      logRet: {this.state.logReturn} %
                    </li>
                    <li>
                      vol: {this.state.volatility} %
                    </li>
                </ul>
            </div>
        </div>

    )
    return (
      <span>
        <SmoothCollapse expanded={this.state.showStockPick}>
            <div className="stock-pick">
                <div className="row stock-pick-header" key={ticker}>
                  <input type="checkbox" title="Include in analysis?" className="stock-check" defaultChecked />&nbsp;&nbsp;
                  <span className="delete-button-span" title={`Delete ${ticker} from portfolio`}>&nbsp;<i className="ion-trash-a delete-button" onClick={this.handleDeleteClick}></i></span>
                  <span className="stock-pick-price" title={`${ticker} price $${this.state.price}`}>&nbsp;$&nbsp;{this.state.price}</span>
                  <span className="stock-pick-click">
                    <a onClick={this.handleToggleDetailClick.bind(this)} title={`${ticker} | ${name}`}>
                      <i className={this.state.arrowClass}>&nbsp;</i>
                      <span className="stock-symbol">{ticker}</span>
                      <span className="stock-name">&nbsp;|&nbsp;{name}</span>
                    </a>
                  </span>
                </div>
                <div className="row stock-detail">
                  <SmoothCollapse expanded={this.state.showStockDetail}>
                    <StockDetail />
                  </SmoothCollapse>
                </div>
            </div>
        </SmoothCollapse>
      </span>
    );
  }
};

function mapStateToProps({ stockData, toolbarVariables }) {
  return {
    stockData,
    toolbarVariables
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dropStockPick,
      dropStockData,
      fetchStockData,
      replaceStockData
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

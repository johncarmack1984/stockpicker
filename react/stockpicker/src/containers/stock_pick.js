import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SmoothCollapse from 'react-smooth-collapse';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { fetchStockData, replaceStockData, dropStockData } from '../actions/index';


function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


class StockPick extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showStockPick: true,
        showStockDetail: this.props.toolbarVariables.expandAll,
        arrowClass: this.props.toolbarVariables.expandArrowClass,
      }
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    this.props.dropStockData(this.props.ticker);
    this.setState({ showStockPick: false });
  }

  getInitialProps() {

  }
  getInitialState() {

  }
  componentWillReceiveProps(nextProps) {
    // handle timeFrame change
    if (nextProps.toolbarVariables.timeFrame !== this.props.toolbarVariables.timeFrame) {
      this.props.dropStockData(this.props.ticker);
      this.props.fetchStockData(this.props.ticker, nextProps.toolbarVariables.timeFrame);
      //
      //this.props.replaceStockData(this.props.index, this.props.ticker, this.props.toolbarVariables.timeFrame)
    }
    // handle expand/collapse all
    if (nextProps.toolbarVariables.expandAll !== this.props.toolbarVariables.expandAll) {
      if (nextProps.toolbarVariables.expandAll) {
        this.setState({
          showStockDetail: true,
          arrowClass: 'ion-arrow-down-b stock-arrow'
        });
      } else if (!nextProps.toolbarVariables.expandAll) {
        this.setState({
          showStockDetail: false,
          arrowClass: 'ion-arrow-right-b stock-arrow'
        });
      }
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
    /*console.log(this.props.toolbarVariables);
    if (!this.props.toolbarVariables.expandAll) {
      this.handleCollapse();
    }*/
    //const endDate = this.props.data.end_date
    const prices = this.props.data.prices;
    const logReturn = round(this.props.data.log_return*100,2);
    const name = this.props.data.name;
    const price = round(this.props.data.price,2);
    //const startDate = this.props.data.start_date;
    const ticker = this.props.data.ticker;
    const volatility = round(this.props.data.volatility*100,2);
    //console.log(`${ticker}: expandAll = ${this.props.toolbarVariables.expandAll}`);
    //console.log(this.props.index);
    const StockDetail = (props) => (
        <div className="col span-2-of-2">
            <div className="small-chart row">
              <Sparklines
                data={prices}
                style={{
                  background: "rgba( 54,  2, 78,0.9)",
                  backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.1))",
                  borderRadius: "5px"
                }}
                margin={10}
                height={80}>
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
                      logRet: {logReturn} %
                    </li>
                    <li>
                      vol: {volatility} %
                    </li>
                </ul>
            </div>
        </div>

    )
    //console.log(this.props);
    return (
      <span>
        <SmoothCollapse expanded={this.state.showStockPick} /*expanded={true}*/>
          <div className="stock-pick">
              <div
                className="row stock-pick-header"
                key={ticker}>
                <i
                  className="ion-trash-a delete-button"
                   onClick={this.handleDeleteClick}></i>
                <span
                  className="stock-pick-price">
                  &nbsp;$&nbsp;{price}
                </span>
                <input type="checkbox" className="stock-check" defaultChecked />&nbsp;&nbsp;
                <span className="stock-pick-click">
                  <a
                    onClick={this.toggleDetail.bind(this)}
                    title={`${ticker} | ${name}`}>
                    <i className={this.state.arrowClass}>&nbsp;</i>
                    <span className="stock-symbol">
                      {ticker}
                    </span>
                    <span className="stock-name">
                      &nbsp;|&nbsp;{name}
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
  return bindActionCreators({ dropStockData, fetchStockData, replaceStockData }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(StockPick);

/*


<div >


    <a className="js--ideal-weight"><span className="ideal-weight js--ideal-weight">18&#37;</span></a>
      <span className="num-shares">1</span>





</div>
*/

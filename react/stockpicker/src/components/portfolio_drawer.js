import React, { Component } from 'react';
import StockPick from './stock_pick';
import SmoothCollapse from 'react-smooth-collapse';
import { CSSTransitionGroup } from 'react-transition-group';
//sortable list: https://github.com/clauderic/react-sortable-hoc
//import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


class PortfolioDrawer extends Component {
  render() {
    var loadingNum = this.props.portfolio.length

    const stockPicks = this.props.data.map((stock, index) => {
      loadingNum = loadingNum - 1;
      return <StockPick
                key={index}
                ticker={stock.ticker}
                timeFrame={this.props.timeFrame}
                data={this.props.data[index]} />
    });

    let showLoadingCell;
    if (loadingNum > 0) {
      showLoadingCell = true;
    } else if (loadingNum === 0)  {
      showLoadingCell = false;
    }

    const loadingCell = (loadingNum) => {
      var loadingString = `loading ${loadingNum}`
      return (
        <div className="loading-cell row">
          <center>{loadingString}</center>
        </div>
      )
    }

    return (
    <div>
      <SmoothCollapse expanded={showLoadingCell}>
        {loadingCell(loadingNum)}
      </SmoothCollapse>
      <ul className="stock-picks row">
        <CSSTransitionGroup
          transitionName="stock-pick-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {stockPicks}
        </CSSTransitionGroup>
      </ul>

    </div>
    );
  }
};

export default PortfolioDrawer;

/*
//constructor(props) {
  //super(props);
  //const placeHolders = this.props.portfolio.map((ticker, index) => {
    //console.log(ticker)
    //return <StockPick key={index} ticker={ticker} timeFrame={this.props.timeFrame} data={[]} />
  //});
  //this.state = { placeHolders: placeHolders }
//}

//console.log(this.state);
//console.log(this.props.data);
//working on possibly rendering box then data...
//const stockPicks = this.props.portfolio.map((ticker, index) => {
  //return <StockPick key={index} ticker={ticker} timeFrame={this.props.timeFrame} />
//});
//const placeHolders =
//console.log(this.props.portfolio[0])
//const placeHolders = this.state.placeHolders;
//console.log(placeHolders.splice(0,1))

//
//placeHolders.splice(0,1)
//console.log(placeHolders)

{this.state.placeHolders}
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { CSSTransitionGroup } from 'react-transition-group';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StockPick from '../containers/stock_pick';
//sortable list: https://github.com/clauderic/react-sortable-hoc

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { fetchStockData, replaceStockData, } from '../actions/index';
import { rearrangeStockList, } from '../actions/index';

const SortableStockPick = SortableElement(({value}) =>
  <li>
    <StockPick
      key={value.ticker}
      ticker={value.ticker}
      name={value.name}
      value={value}
      settings={value.settings}/>
    </li>
);

const SortablePortfolioList = SortableContainer(({items}) => {
  return (
    <ul className="stock-picks">
        {items.map((value, index) => (
          <SortableStockPick
            key={`item-${index}`}
            index={index}
            value={value}
            axis={'y'}
            lockAxis={'y'}
            helperClass="stock-pick"
            transitionDuration={100}/>
        ))}
    </ul>
  );
});

class PortfolioDrawer extends Component {

  getInitialProps() {  }

  componentDidMount() {
    this.props.stockList.map(stockPick => this.props.fetchStockData(stockPick.ticker, this.props.toolbarVariables.timeFrame))
  }

  componentWillUpdate(nextProps) {
  }
  onSortEnd = ({oldIndex, newIndex}) => { this.props.rearrangeStockList(oldIndex, newIndex); }
  render() {
    return (
        <SortablePortfolioList
          items={this.props.stockList}
          onSortEnd={this.onSortEnd}
          pressDelay={175}
          useWindowAsScrollContainer={true}
          axis={'y'}
          lockAxis={'y'}
          hideSortableGhost={true}/>
    )
  }
}

function mapStateToProps({ stockList, stockData, toolbarVariables }) {
  return {
    stockList,
    stockData,
    toolbarVariables
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchStockData,
      rearrangeStockList,
      replaceStockData
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDrawer);

/*

renderList(stockList) {
  return (<StockPick key={stockList.ticker} ticker={stockList.ticker} name={stockList.name}/>)
}

{this.props.stockList.map(this.renderList).reverse()}

<CSSTransitionGroup
  transitionName="stock-pick-transition"
  transitionEnterTimeout={250}
  transitionLeaveTimeout={250}>
</CSSTransitionGroup>



// non-sortable list


Loading cell:
//return this.props.stockData.map((stock) => {
  //loadingNum = loadingNum - 1;
  //return true;//
//});

/*
renderLoadingBar() {
  let expanded;
  if (loadingNum > 0) {
    expanded = true;
  } else {
    expanded = false;
  }
  return (
    <SmoothCollapse expanded={expanded}>
      <LoadingBar />
    </SmoothCollapse>
  )
}


miscellaneous code that has been useful at one point

    //var loadingNum = this.props.portfolio.length

    //const stockPicks =

    //let showLoadingCell;
    //if (loadingNum > 0) {
      //showLoadingCell = true;
    //} else if (loadingNum === 0)  {
      //showLoadingCell = false;
    //}

    //const loadingCell = (loadingNum) => {
      //var loadingString = `loading ${loadingNum}`
      //return (
        //<div className="loading-cell row">
          //<center>{loadingString}</center>
        //</div>
      //)
    //}

    <SmoothCollapse expanded={showLoadingCell}>
      {loadingCell()}
    </SmoothCollapse>


*/

/*
this code got too complicated... it may or not may be useful.
componentWillUpdate(nextProps) {
  // first things first, if nextProps ain't these props
  if (nextProps !== this.props) {
    //console.log(nextProps)
    this.props.stockList.map(stockPick => {
      if (nextProps.toolbarVariables.timeFrame !== this.props.toolbarVariables.timeFrame) {
        //console.log(nextProps.toolbarVariables.timeFrame)
        if (nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame] !== undefined) {
          //console.log(nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame])
        }
      } // <-- end of "if timeFrame changed"
      // if there is already data for this stock in other timeFrames,
      if (nextProps.stockData[stockPick.ticker] !== undefined) {
        // AND the incoming data for this timeFrame  not YET undefined,
        if (nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame] === undefined) {
          // ... fetch data for the new timeFrame
          this.props.replaceStockData(stockPick.ticker, nextProps.toolbarVariables.timeFrame)
        }
      }
      /*
      if (this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame] === 'undefined') {
        console.log(`It's undefined right now for ${this.props.stockData[this.props.ticker][this.props.toolbarVariables.timeFrame]}`)
      }
      */
      // if incoming props have new data for this ticker
/*      if (nextProps.stockData[stockPick.ticker] !== this.props.stockData[stockPick.ticker]) {
        //console.log(nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame])
        // if incoming props have data for this ticker and timeFrame
        if (nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame]) {
          //console.log(nextProps.stockData[stockPick.ticker][nextProps.toolbarVariables.timeFrame])
          //console.log(`${stockPick.ticker} ${nextProps.toolbarVariables.timeFrame} is in cache`)
        } else {
          //console.log(`need to fetch ${stockPick.ticker} ${nextProps.toolbarVariables.timeFrame}`)
        }
      } return true
    }) // < -- end of stockList.map()
  } // < -- end of "if props have changed"
}

 */

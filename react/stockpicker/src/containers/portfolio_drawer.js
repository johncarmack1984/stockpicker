import React, { Component } from 'react';
import { connect } from 'react-redux';

import StockPick from '../containers/stock_pick';
import { CSSTransitionGroup } from 'react-transition-group';

class PortfolioDrawer extends Component {
  renderList(stockData, index) {
    return (
      <li key={stockData.ticker}>
        <StockPick
          index={index}
          ticker={stockData.ticker}
          //timeFrame={this.props.timeFrame}
          data={stockData} />
      </li>
    );

  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.rearrangeStockList(oldIndex, newIndex);
  };

  render() {
    return (
      <div>
        <ul className="stock-picks row">
          <CSSTransitionGroup
            transitionName="stock-pick-transition"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}>
            {this.props.stockData.map(this.renderList)}
          </CSSTransitionGroup>
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ stockData }) {

  return {
    stockData,
  };
}

export default connect(mapStateToProps)(PortfolioDrawer);

/*
//sortable list: https://github.com/clauderic/react-sortable-hoc
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { rearrangeStockList } from '../actions/index';

const SortableItem = SortableElement(({value}) => {
  return (
    <li key={value.ticker}>
      <StockPick
        ticker={value.ticker}
        data={value} />
    </li>
  );
})

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="stock-picks row">
      <CSSTransitionGroup
        transitionName="stock-pick-transition"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </CSSTransitionGroup>
    </ul>
  );
});


<div>
  <SortableList
    items={this.props.stockData}
    onSortEnd={this.onSortEnd}
    lockAxis={'y'}
    lockToContainerEdges={true} />
</div>

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rearrangeStockList }, dispatch);
}



Loading cell:
//return this.props.stockData.map((stock) => {
  //loadingNum = loadingNum - 1;
  //return true;//
//});
  <SmoothCollapse expanded={showLoadingCell}>
    {loadingCell()}
  </SmoothCollapse>

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




*/

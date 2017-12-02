import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SmoothCollapse from 'react-smooth-collapse';
import SearchBar from '../containers/search_bar';
import Toolbar from './toolbar';
import StockPick from '../containers/stock_pick';

class PortfolioDrawer extends Component {

  renderToolbar() {
    let expanded;
    if (this.props.stockList.length > 0) {
      expanded = true;
    } else {
      expanded = false;
    }
    return (
      <SmoothCollapse expanded={expanded}>
        <Toolbar />
      </SmoothCollapse>
    );
  }

  renderList(stockList) {
    return (
      <li key={stockList.ticker}>
        <StockPick
          ticker={stockList.ticker}
          name={stockList.name}/>
      </li>
    )
  }

  render() {
    //console.log(this.props.stockData);
    return (
      <div className="sidebar col span-1-of-3">
        <div>
          <div className="sidebar-tools-container">
            <SearchBar />
            {this.renderToolbar()}
          </div>
          <ul className="stock-picks row">
            <CSSTransitionGroup
              transitionName="stock-pick-transition"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}>
              {this.props.stockList.map(this.renderList).reverse() /* <-- reverse() sucks, fix this */}
            </CSSTransitionGroup>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ stockList, stockData }) {
  return {
    stockList,
    stockData
  };
}

export default connect(mapStateToProps)(PortfolioDrawer);

/*
//sortable list: https://github.com/clauderic/react-sortable-hoc

import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { rearrangeStockList } from '../actions/index';

const SortableItem = SortableElement(({value}) => {
  return (
    <li key={value.ticker}>
      <StockPick data={value} />
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

onSortEnd = ({oldIndex, newIndex}) => {
  this.props.rearrangeStockList(oldIndex, newIndex);
  //console.log(this.props.stockData);
};

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

, mapDispatchToProps

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

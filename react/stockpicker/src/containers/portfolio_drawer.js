import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { CSSTransitionGroup } from 'react-transition-group';
import StockPick from '../containers/stock_pick';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { fetchStockData, } from '../actions/index';
import { rearrangeStockList, } from '../actions/index';

const SortableStockPick = SortableElement(({value}) =>
  <li>
    <StockPick
      key={value.ticker}
      ticker={value.ticker}
      name={value.name}
      value={value}
      settings={value.settings}
      data={value.data}/>
    </li>
);

const StockList = SortableContainer(({items}) => {
  return (
    <ul className="stock-picks">
        {items
          .map((value, index) => (
          <SortableStockPick
            key={`item-${index}`}
            index={index}
            value={value}
            axis={'y'}
            lockAxis={'y'}
            helperClass="stock-pick"
            transitionDuration={100}/>
          ))
        }
    </ul>
  );
});

class PortfolioDrawer extends Component {

  getInitialProps() {  }

  componentDidMount() {
    this.props.stockList.map((stockPick, index) => this.props.fetchStockData(stockPick, this.props.toolbarVariables.timeFrame, index))
  }
  componentWillUpdate(nextProps) {
    if (nextProps.toolbarVariables.timeFrame !== this.props.toolbarVariables.timeFrame || nextProps.stockList.length !== this.props.stockList.length) {
      nextProps.stockList.map((stockPick, index) => {
        if (nextProps.stockList[index].data[nextProps.toolbarVariables.timeFrame] === undefined) {
          this.props.fetchStockData(stockPick, nextProps.toolbarVariables.timeFrame, index)
        }
        return true;
      })
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => { this.props.rearrangeStockList(oldIndex, newIndex) }
  render() {
    return (
        <StockList
          items={this.props.stockList}
          onSortEnd={this.onSortEnd}
          pressDelay={160}
          useWindowAsScrollContainer={true}
          axis={'y'}
          lockAxis={'y'}
          hideSortableGhost={true}/>
    )
  }
}

function mapStateToProps({ stockList, toolbarVariables, }) {
  return {
    stockList,
    toolbarVariables,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchStockData,
      rearrangeStockList,
    },
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDrawer);

/*

{this.props.stockList.map(this.renderList).reverse()}

<CSSTransitionGroup
  transitionName="stock-pick-transition"
  transitionEnterTimeout={250}
  transitionLeaveTimeout={250}>
</CSSTransitionGroup>


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

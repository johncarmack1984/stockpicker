import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSelectAllStocks, toggleExpandAll } from '../actions/index';
import { setTimeFrame, toggleSortDesc } from '../actions/index';
import { handleSortByChange } from '../actions/index';
import SmoothCollapse from 'react-smooth-collapse';

class Toolbar extends Component {

  constructor(props) {
    super(props);
    this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
    this.handleSelectAllChange = this.handleSelectAllChange.bind(this);
    this.toggleSortDesc = this.toggleSortDesc.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
  }
  handleSelectAllChange(event) {
    this.props.toggleSelectAllStocks(this.props.toolbarVariables.selectAllStocks);
  }
  handleTimeFrameChange(event) {
    this.props.setTimeFrame(event.target.value);
  }
  handleSortByChange(event) {
    this.props.handleSortByChange(event.target.value, this.props.toolbarVariables.sortDesc, this.props.toolbarVariables.timeFrame);
  }
  toggleSortDesc(event) {
    this.props.toggleSortDesc(this.props.toolbarVariables.sortDesc);
  }
  render() {
    /*
    let expanded;
    if (this.props.stockList.length > 0) {
      expanded = true;
    } else {
      expanded = true;
    }

    let expandArrowClass;
    if (this.props.toolbarVariables.expandAll === true) {
      expandArrowClass = 'ion-arrow-down-b stock-arrow'
    } else {
      expandArrowClass = 'ion-arrow-right-b stock-arrow'
    }
    */
    return (
      <div className="toolbar">
        <SmoothCollapse expanded={true}>
          <div className="toolbar-container">
            <span className="toolbar-expand-collapse">
              <input type="checkbox" title="Check all?" className="stock-check" onChange={this.handleSelectAllChange} checked={true} />&nbsp;&nbsp;
              <a onClick={() => this.props.toggleExpandAll(this.props.toolbarVariables.expandAll)}>
                <i className="ion-arrow-down-b stock-arrow">&nbsp;</i> all
              </a>
            </span>
            <span className="toolbar-select-timeframe-sort-by">
              timeFrame&nbsp;
                <select
                  name="timeFrame"
                  defaultValue="3M"
                  onChange={this.handleTimeFrameChange}>
                  <option value="1W">1W</option>
                  <option value="1M">1M</option>
                  <option value="3M">3M</option>
                  <option value="1Y">1Y</option>
                  <option value="5Y">5Y</option>
                </select>
            </span>
          </div>
        </SmoothCollapse>
      </div>
    );
  }
}

function mapStateToProps({ toolbarVariables, stockList }) {
  // Whatever is returned from here will show up as props
  // inside of toolbar
  return {
    toolbarVariables,
    stockList
  };
}

// Anything returned from this function will end up as props
// on the Toolbar container
function mapDispatchToProps(dispatch) {
  // Whenever toggleExpandAll is called, the result should be passed to
  // all of our reducers
  return bindActionCreators({
    toggleSelectAllStocks,
    toggleExpandAll,
    setTimeFrame,
    toggleSortDesc,
    handleSortByChange
  }, dispatch)
}

// Promote Toolbar from a component to a container; it needs to know about
// this new dispatch method from mapDispatchToProps; make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

/*
() => this.props.setTimeFrame(this.target)


//Immutable migration

{this.props.toolbarVariables.selectAllStocks}
{this.props.toolbarVariables.timeFrame}



// Loading number
:
//return this.props.stockData.map((stock) => {
  //loadingNum = loadingNum - 1;
  //return true;//
//});

let loadginNum;
if (loadingNum > 0) {
   = true;
} else {
  expanded = false;
}
return (
  <SmoothCollapse expanded={expanded}>
    <LoadingBar />
  </SmoothCollapse>
)

/
// "sorted by"

let sortArrowClass;
if (this.props.toolbarVariables.sortDesc === true) {
  sortArrowClass = 'ion-arrow-down-b stock-arrow';
} else {
  sortArrowClass = 'ion-arrow-up-b stock-arrow';
}

sort&nbsp;
  <select
    name="sortBy"
    defaultValue={this.props.toolbarVariables.sortBy}
    onChange={this.handleSortByChange}>
    <option value={undefined}>-------</option>
    <option value="ticker">ticker</option>
    <option value="name">name</option>
    <option value="price">price</option>
    <option value="logRet">logRet</option>
    <option value="vol">vol</option>
    <option value="ratio">ratio</option>
  </select>
  <a onClick={this.toggleSortDesc.bind(this)}>&nbsp;<i className={sortArrowClass}>&nbsp;</i></a>


 */

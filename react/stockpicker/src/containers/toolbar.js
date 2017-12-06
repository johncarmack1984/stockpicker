import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleExpandAll, setTimeFrame } from '../actions/index';
import SmoothCollapse from 'react-smooth-collapse';

class Toolbar extends Component {

  constructor(props) {
    super(props);
    this.handleTimeFrameChange = this.handleTimeFrameChange.bind(this);
  }

  renderToolbar() {
    let expanded;
    if (this.props.stockList.length > 0) {
      expanded = true;
    } else {
      expanded = true;
    }
    return (
      <SmoothCollapse expanded={expanded}>
        <div className="toolbar-container">
          <span className="toolbar-expand-collapse">
            <a onClick={() => this.props.toggleExpandAll(this.props.toolbarVariables.expandAll, this.props.toolbarVariables.expandArrowClass)}>
              <i className={this.props.toolbarVariables.expandArrowClass}>&nbsp;</i> all
            </a>
          </span>
          <span className="toolbar-select-timeframe">
            &nbsp;timeFrame:&nbsp;
              <select
                name="timeFrame"
                defaultValue={this.props.toolbarVariables.timeFrame}
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
    );
  }

  handleTimeFrameChange(event) { this.props.setTimeFrame(event.target.value); }

  render() {
    return (
      <div className="toolbar">{this.renderToolbar()}</div>
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
  return bindActionCreators({ toggleExpandAll, setTimeFrame }, dispatch)
}

// Promote Toolbar from a component to a container; it needs to know about
// this new dispatch method from mapDispatchToProps; make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

/*
() => this.props.setTimeFrame(this.target)

// "select all"



<input type="checkbox" className="stock-check" defaultChecked />&nbsp;&nbsp;

// "show all"

// stuck on figuring out how to trigger toggle after variable changes

/
// "sorted by"
sortDesc: true,
sortString: 'desc',
sortArrowClass: 'ion-arrow-down-b stock-arrow'

toggleSortDesc() {
  this.setState({ sortDesc: !this.state.sortDesc })
  if (this.state.sortArrowClass === 'ion-arrow-up-b stock-arrow'){
    this.setState({
      sortString: 'desc',
      sortArrowClass: 'ion-arrow-down-b stock-arrow'
    });
  } else {
    this.setState({
      sortString: 'asc',
      sortArrowClass: 'ion-arrow-up-b stock-arrow'
    });
  }
}
<span className="sidebar-toolbar-sort-by">
  &nbsp;sorted by&nbsp;
    <select defaultValue="placeholder">
      <option value="placeholder">------</option>
      <option value="ticker">ticker</option>
      <option value="name">name</option>
      <option value="price">price</option>
      <option value="logRet">logRet</option>
      <option value="vol">vol</option>
      <option value="ratio">ratio</option>
    </select>
    <a onClick={this.toggleSortDesc.bind(this)}>&nbsp;{this.state.sortString}&nbsp;&nbsp;<i className={this.state.sortArrowClass}>&nbsp;</i></a>
</span>
 */

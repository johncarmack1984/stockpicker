import { TOGGLE_EXPAND_ALL, SET_TIME_FRAME, TOGGLE_SELECT_ALL_STOCKS } from '../actions/index';
import { TOGGLE_SORT_DESC, HANDLE_SORT_BY_CHANGE } from '../actions/index';
//import { REARRANGE_STOCK_LIST } from '../actions/index';
import Immutable from 'immutable';

// default settings
const defaultToolbar = Immutable.fromJS({
  expandAll: true,
  timeFrame: '3M',
  selectAllStocks: true,
  sortDesc: true,
  sortBy: undefined
})

export default function(state, action) {
  if (typeof state === 'undefined') {
    return defaultToolbar
  }
  switch (action.type) {
  case TOGGLE_EXPAND_ALL:
    //return { ...state, expandAll: !state.expandAll };
    return state;
  case TOGGLE_SELECT_ALL_STOCKS:
    //return { ...state, selectAllStocks: !state.selectAllStocks };
    return state;
  case SET_TIME_FRAME:
    //return { ...state, timeFrame: action.payload, sortBy: undefined };
    return state;
  case TOGGLE_SORT_DESC:
    //return { ...state, sortDesc: !action.payload };
    return state;
  case HANDLE_SORT_BY_CHANGE:
    //return { ...state, sortBy: action.payload };
    return state;
  /*
  case REARRANGE_STOCK_LIST:
    return { ...state, sortBy: undefined }
  */
  default:
    return state;
  }

}

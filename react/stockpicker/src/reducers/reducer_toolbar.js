import { TOGGLE_EXPAND_ALL, SET_TIME_FRAME, TOGGLE_SELECT_ALL_STOCKS } from '../actions/index';

// default settings
const defaultToolbar = {
  expandAll: true,
  timeFrame: '3M',
  selectAllStocks: true
}

export default function(state, action) {
  if (typeof state === 'undefined') {
    return defaultToolbar
  }
  switch (action.type) {
  case TOGGLE_EXPAND_ALL:
    return { ...state, expandAll: !state.expandAll };
  case TOGGLE_SELECT_ALL_STOCKS:
    return { ...state, selectAllStocks: !state.selectAllStocks };
  case SET_TIME_FRAME:
    return { ...state, timeFrame: action.payload };
  default:
    return state;
  }

}

import { TOGGLE_EXPAND_ALL, SET_TIME_FRAME, TOGGLE_SELECT_ALL_STOCKS } from '../actions/index';
//import update from 'immutability-helper';
//import dotProp from 'dot-prop-immutable';

// default settings
const defaultToolbar = {
  expandAll: true,
  expandArrowClass: 'ion-arrow-down-b stock-arrow',
  timeFrame: '3M',
  selectAllStocks: true
}

export default function(state, action) {
  if (typeof state === 'undefined') {
    return defaultToolbar
  }
  switch (action.type) {
  case TOGGLE_EXPAND_ALL:
    let newArrowClass;
    if (state.expandArrowClass === 'ion-arrow-right-b stock-arrow') {
      newArrowClass =  'ion-arrow-down-b stock-arrow';
    } else {
      newArrowClass = 'ion-arrow-right-b stock-arrow';
    }
    return {
      ...state,
      expandAll: !state.expandAll,
      expandArrowClass: newArrowClass
    };
  case TOGGLE_SELECT_ALL_STOCKS:
    return {...state, selectAllStocks: !state.selectAllStocks};
  case SET_TIME_FRAME:
    return {
      ...state,
      timeFrame: action.payload
    };
  default:
    // default settings
    return state;
  }

}


/*, SET_TIME_FRAME*/
//case SET_TIME_FRAME:
  //return action.payload;

//

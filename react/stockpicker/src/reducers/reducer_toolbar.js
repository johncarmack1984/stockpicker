import { TOGGLE_EXPAND_ALL, SET_TIME_FRAME } from '../actions/index';

// default settings
const defaultToolbar = {
  expandAll: true,
  expandArrowClass: 'ion-arrow-down-b stock-arrow',
  timeFrame: '3M'
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
      expandAll: !state.expandAll,
      expandArrowClass: newArrowClass,
      timeFrame: state.timeFrame
    };
  case SET_TIME_FRAME:
    return {
      expandAll: state.expandAll,
      expandArrowClass: state.expandArrowClass,
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

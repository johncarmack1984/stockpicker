import { FETCH_STOCK_DATA } from '../actions/index';
import { REPLACE_STOCK_DATA } from '../actions/index';
import { DROP_STOCK_DATA } from '../actions/index';
//import dotProp from 'dot-prop-immutable';
import update from 'immutability-helper';
//import { arrayMove } from 'react-sortable-hoc';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_STOCK_DATA:
    return update(state, {$merge: {[action.payload.data.ticker]: {[action.payload.data.time_frame]: action.payload.data}}});
  case REPLACE_STOCK_DATA:
    return update(state, {[action.payload.data.ticker]: {$merge: {[action.payload.data.time_frame]: action.payload.data}}});
  case DROP_STOCK_DATA:
    delete state[action.payload];
    return state;
  default:
    return state;
  }
}



/*, REARRANGE_STOCK_LIST*/
/*case REARRANGE_STOCK_LIST:
  return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);*/

import { FETCH_STOCK_DATA, DROP_STOCK_DATA } from '../actions/index';


export default function(state = [], action) {
  switch (action.type) {
  case FETCH_STOCK_DATA:
    return state.concat([action.payload.data]);
  case DROP_STOCK_DATA:
    const stockDataMinusDeleted = state.filter(stock => stock.ticker !== action.payload);
    return stockDataMinusDeleted;
  default:
    return state;
  }
}


//return [ action.payload.data, ...state ];

/*, REARRANGE_STOCK_LIST, SET_TIME_FRAME*/
//case SET_TIME_FRAME:
  //return action.payload;

//import { arrayMove } from 'react-sortable-hoc';
//case REARRANGE_STOCK_LIST:
  //return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);

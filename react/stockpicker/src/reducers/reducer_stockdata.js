import { FETCH_STOCK_DATA, DROP_STOCK_DATA/*, REARRANGE_STOCK_LIST*/ } from '../actions/index';
import { REPLACE_STOCK_DATA } from '../actions/index';
//import { arrayMove } from 'react-sortable-hoc';

/*
function replaceItemInArray(oldArray, index, newData) {
    var newArray = oldArray;
    var removed = newArray.splice(index,1,newData);
    removed = '';
    oldArray = '';
    return newArray;
}
*/

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_STOCK_DATA:
    //console.log (action.payload.data);
    //console.log(this.props);
    return state.concat([action.payload.data]);
  case REPLACE_STOCK_DATA:
    //console.log(state);
    //console.log(action.payload.index);
    //console.log(action.payload.request);
    //console.log(replaceItemInArray(state, action.payload.index, action.payload.request.data);
    //console.log(replaceItemInArray(state, action.payload.index, action.payload.request.data));
    //state.splice(action.payload.index, 1, action.payload.request.data);
    //console.log(state);
    return state;
  /*case REARRANGE_STOCK_LIST:
    return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);*/
  case DROP_STOCK_DATA:
    return state.filter(stock => stock.ticker !== action.payload);
  default:
    return state;
  }
  //return state;
}



//return [ action.payload.data, ...state ];

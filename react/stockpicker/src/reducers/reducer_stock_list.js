import { ADD_STOCK_PICK, DROP_STOCK_PICK } from '../actions/index';
import { FETCH_STOCK_DATA, REARRANGE_STOCK_LIST } from '../actions/index';
import { TOGGLE_SHOW_STOCK_DETAIL, TOGGLE_EXPAND_ALL } from '../actions/index';
import { TOGGLE_CHECK_BOX, TOGGLE_SELECT_ALL_STOCKS } from '../actions/index';
//import { HANDLE_SORT_BY_CHANGE, TOGGLE_SORT_DESC } from '../actions/index';
import dotProp from 'dot-prop-immutable';
import update from 'immutability-helper';

const defaultPortfolio = [
  {
    ticker: 'DAX',
    name: 'Horizons DAX Germany',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
    data: {
    }
  },
  {
    ticker: 'DIA',
    name: 'SPDR Dow Jones Industrial Average',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
    data: {
    }
  },

  {
    ticker: 'SPY',
    name: 'SPDR S&P 500',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
    data: {
    }
  },
  /*
  {
    ticker: 'EWG',
    name: 'iShares MSCI Germany Index Fund',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
    data: {
    }
  }
  */
]

function arrayMoveImmutable(array, previousIndex, newIndex) {
  var length = array.length;
  var newLength = newIndex >= length ? newIndex + 1 : length;
  var newArray = new Array(newLength);
  var element = array[previousIndex];

  for (var i = 0, j = 0; i < newLength; i++) {
    if (i === newIndex) {
      newArray[i] = element;
    } else {
      if (j === previousIndex) {
        j++;
      }

      if (j < length) {
        newArray[i] = array[j++];
      } else {
        newArray[i] = undefined;
      }
    }
  }

  return newArray;
}

export default function(state, action) {
  if (typeof state === 'undefined') {
    return defaultPortfolio;
  }
  switch (action.type) {
  case ADD_STOCK_PICK:
    return [ action.payload, ...state ];
  case FETCH_STOCK_DATA:
    return update(state, {[state.indexOf(action.meta.stockPick)]: {data: {$merge: {[action.payload.data.time_frame]: action.payload.data}}}});
  case TOGGLE_SHOW_STOCK_DETAIL:
    return dotProp.toggle(state, `${state.indexOf(action.payload)}.settings.showStockDetail`);
  case TOGGLE_CHECK_BOX:
    return dotProp.toggle(state, `${state.indexOf(action.payload)}.settings.isChecked`);
  case TOGGLE_SELECT_ALL_STOCKS:
    return state.map(obj => dotProp.set(obj, 'settings.isChecked', !action.payload));
  case TOGGLE_EXPAND_ALL:
    return state.map(obj => dotProp.set(obj, 'settings.showStockDetail', !action.payload));
  case REARRANGE_STOCK_LIST:
    return arrayMoveImmutable(state, action.payload.oldIndex, action.payload.newIndex);
  case DROP_STOCK_PICK:
    return state.filter(stock => stock.ticker !== action.payload);
  default:
    return state;
  }
}

/*

case TOGGLE_SORT_DESC:
  return state;
case HANDLE_SORT_BY_CHANGE:
  //console.log(state.sort())
  //console.log(state.sort((a,b) => a.data[action.payload.timeFrame].log_return - b.data[action.payload.timeFrame].log_return).reverse())
  //console.log(action.payload)
  return state;

 */

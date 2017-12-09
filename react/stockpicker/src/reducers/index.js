//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable';
import stockList from './reducer_stock_list';
import toolbarVariables from './reducer_toolbar';
//import Immutable from 'immutable';

const rootReducer = combineReducers({
  stockList,
  toolbarVariables
});

export default rootReducer;

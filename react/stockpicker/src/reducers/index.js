import { combineReducers } from 'redux';
import stockList from './reducer_stock_list';
import stockData from './reducer_stockdata';
import toolbarVariables from './reducer_toolbar';

const rootReducer = combineReducers({
  stockList,
  stockData,
  toolbarVariables
});

export default rootReducer;

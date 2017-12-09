import { combineReducers } from 'redux';
import stockList from './reducer_stock_list';
import toolbarVariables from './reducer_toolbar';

const rootReducer = combineReducers({
  stockList,
  toolbarVariables
});

export default rootReducer;

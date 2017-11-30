import { combineReducers } from 'redux';
import stockData from './reducer_stockdata';
import toolbarVariables from './reducer_toolbar';

const rootReducer = combineReducers({
  stockData,
  toolbarVariables
});

export default rootReducer;

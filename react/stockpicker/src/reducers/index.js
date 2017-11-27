import { combineReducers } from 'redux';
import StockDataReducer from './reducer_stockdata';

const rootReducer = combineReducers({
  stockData: StockDataReducer
});

export default rootReducer;

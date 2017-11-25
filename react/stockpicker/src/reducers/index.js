import { combineReducers } from 'redux';
import StocksReducer from './reducer_stocks';

const rootReducer = combineReducers({
  stocks: StocksReducer
});

export default rootReducer;

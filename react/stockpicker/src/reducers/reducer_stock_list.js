import { ADD_STOCK_PICK, DROP_STOCK_PICK } from '../actions/index';

const defaultPortfolio = [
  {
    ticker: 'DAX',
    name: 'Horizons DAX Germany',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
  },
  {
    ticker: 'DIA',
    name: 'SPDR Dow Jones Industrial Average',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
  },
  {
    ticker: 'SPY',
    name: 'SPDR S&P 500',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
  },/*
  {
    ticker: 'EWG',
    name: 'iShares MSCI Germany Index Fund',
    settings: {
      showStockDetail: true,
      isChecked: true
    },
  },*/
]

export default function(state, action) {
  if (typeof state === 'undefined') {
    return defaultPortfolio;
  }
  switch (action.type) {
  case ADD_STOCK_PICK:
    return state.concat([action.payload]);
    //return [ action.payload.data, ...state ];
  case DROP_STOCK_PICK:
    return state.filter(stock => stock.ticker !== action.payload);
  default:
    return state;
  }
}

/*

{
  ticker: 'DAX',
  name: 'Horizons DAX Germany ETF',
  settings: { }
},

 */

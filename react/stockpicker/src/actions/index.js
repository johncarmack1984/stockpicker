import axios from 'axios';

//const BACKEND_URL = 'http://127.0.0.1:5000';
const BACKEND_URL = 'http://192.168.0.2:5000';
//const BACKEND_URL = 'https://u4xxjfnsze.execute-api.us-east-1.amazonaws.com/dev';

export const ADD_STOCK_PICK = 'ADD_STOCK_PICK';
export function addNewStockPick(searchValue, expandAllValue) {
  var searchValueSplit = searchValue.split(' | ', 2);
  const stockContainer = {
    ticker: searchValueSplit[0].trim(),
    name: searchValueSplit[1].trim(),
    settings: {
      showStockDetail: expandAllValue,
      isChecked: true
    }
  }
  return {
    type: ADD_STOCK_PICK,
    payload: stockContainer
  }
}

export const FETCH_STOCK_DATA = 'FETCH_STOCK_DATA';
export function fetchStockData(ticker, timeFrame) {
  const url = `${BACKEND_URL}/${ticker}/${timeFrame}/`;
  const request = axios.get(url);
  return {
    type: FETCH_STOCK_DATA,
    payload: request
  };
}
export const REPLACE_STOCK_DATA = 'REPLACE_STOCK_DATA';
export function replaceStockData(ticker, timeFrame) {
  const url= `${BACKEND_URL}/${ticker}/${timeFrame}/`;
  const request = axios.get(url);
  return {
    type: REPLACE_STOCK_DATA,
    payload: request
  }
}

/*
export const REARRANGE_STOCK_LIST = 'REARRANGE_STOCK_LIST';
export function rearrangeStockList(oldIndex, newIndex) {
  return {
    type: REARRANGE_STOCK_LIST,
    payload: { oldIndex, newIndex }
  };
}
*/

export const DROP_STOCK_DATA = 'DROP_STOCK_DATA';
export function dropStockData(ticker) {
  return {
    type: DROP_STOCK_DATA,
    payload: ticker
  };
}

export const DROP_STOCK_PICK = 'DROP_STOCK_PICK';
export function dropStockPick(ticker) {
  return {
    type: DROP_STOCK_PICK,
    payload: ticker
  };
}

export const TOGGLE_EXPAND_ALL = 'TOGGLE_EXPAND_ALL';
export function toggleExpandAll(expandAll, expandArrowClass) {
  return {
    type: TOGGLE_EXPAND_ALL,
    payload: { expandAll, expandArrowClass }
  };
}

export const SET_TIME_FRAME = 'SET_TIME_FRAME';
export function setTimeFrame(timeFrame) {
  return {
    type: SET_TIME_FRAME,
    payload: timeFrame
  };
}


//const BACKEND_URL = 'https://dg6hbo4hka.execute-api.us-east-1.amazonaws.com/dev';
//const BACKEND_URL = 'https://api.stockpicker.io/v1';

/*
import fetchStockData, { FETCH_STOCK_DATA } from './actions_stockdata';
import replaceStockData, { REPLACE_STOCK_DATA } from './actions_stockdata';
import dropStockData, { DROP_STOCK_DATA } from './actions_stockdata';

import toggleExpandAll, { TOGGLE_EXPAND_ALL } from './actions_toolbar';
import setTimeFrame, { SET_TIME_FRAME } from './actions_toolbar';

export { fetchStockData, FETCH_STOCK_DATA };
export { replaceStockData, REPLACE_STOCK_DATA };
export { dropStockData, DROP_STOCK_DATA };

export { toggleExpandAll, TOGGLE_EXPAND_ALL };
export { setTimeFrame, SET_TIME_FRAME };
*/

import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:5000';

export const FETCH_STOCK_DATA = 'FETCH_STOCK_DATA';
export function fetchStockData(ticker, timeFrame) {
  const url = `${BACKEND_URL}/${ticker}/${timeFrame}/`;
  const request = axios.get(url);
  return {
    type: FETCH_STOCK_DATA,
    payload: request
  };
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
export const REPLACE_STOCK_DATA = 'REPLACE_STOCK_DATA';
export function replaceStockData(index, ticker, timeFrame) {
  const url= `${BACKEND_URL}/${ticker}/${timeFrame}/`;
  const request = axios.get(url);
  return {
    type: REPLACE_STOCK_DATA,
    payload: { index, request }
  }
}

export const DROP_STOCK_DATA = 'DROP_STOCK_DATA';
export function dropStockData(ticker) {
  return {
    type: DROP_STOCK_DATA,
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

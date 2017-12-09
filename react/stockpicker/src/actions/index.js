import axios from 'axios';

const BACKEND_URL = 'http://192.168.0.2:5000';
//const BACKEND_URL = 'https://u4xxjfnsze.execute-api.us-east-1.amazonaws.com/dev';
//const BACKEND_URL = 'https://api.stockpicker.io/v1';

// stockList actions

export const ADD_STOCK_PICK = 'ADD_STOCK_PICK';
export function addNewStockPick(searchValue, expandAllValue, selectAllStocksValue) {
  var searchValueSplit = searchValue.split(' | ', 2);
  const stockContainer = {
    ticker: searchValueSplit[0].trim(),
    name: searchValueSplit[1].trim(),
    settings: {
      showStockDetail: expandAllValue,
      isChecked: selectAllStocksValue
    },
    data: {
    }
  }
  return {
    type: ADD_STOCK_PICK,
    payload: stockContainer
  }
}

export const FETCH_STOCK_DATA = 'FETCH_STOCK_DATA';
export function fetchStockData(stockPick, timeFrame, index) {
  const url = `${BACKEND_URL}/${stockPick.ticker}/${timeFrame}/`;
  const request = axios.get(url);
  return {
    type: FETCH_STOCK_DATA,
    payload: request,
    meta: {
      index,
      stockPick
    }
  };
}

export const TOGGLE_SHOW_STOCK_DETAIL = 'TOGGLE_SHOW_STOCK_DETAIL';
export function toggleShowStockDetail(value) {
  return {
    type: TOGGLE_SHOW_STOCK_DETAIL ,
    payload: value
  };
}

export const TOGGLE_CHECK_BOX = 'TOGGLE_CHECK_BOX';
export function toggleCheckBox(value) {
  return {
    type: TOGGLE_CHECK_BOX,
    payload: value
  };
}

export const REARRANGE_STOCK_LIST = 'REARRANGE_STOCK_LIST';
export function rearrangeStockList(oldIndex, newIndex) {
  return {
    type: REARRANGE_STOCK_LIST,
    payload: { oldIndex, newIndex }
  };
}

export const DROP_STOCK_PICK = 'DROP_STOCK_PICK';
export function dropStockPick(ticker) {
  return {
    type: DROP_STOCK_PICK,
    payload: ticker
  };
}

// toolbar actions

export const TOGGLE_EXPAND_ALL = 'TOGGLE_EXPAND_ALL';
export function toggleExpandAll(expandAll) {
  return {
    type: TOGGLE_EXPAND_ALL,
    payload: expandAll
  };
}

export const TOGGLE_SELECT_ALL_STOCKS = 'TOGGLE_SELECT_ALL_STOCKS';
export function toggleSelectAllStocks(selectAllStocks) {
  return {
    type: TOGGLE_SELECT_ALL_STOCKS,
    payload: selectAllStocks
  };
}

export const SET_TIME_FRAME = 'SET_TIME_FRAME';
export function setTimeFrame(timeFrame) {
  return {
    type: SET_TIME_FRAME,
    payload: timeFrame
  };
}

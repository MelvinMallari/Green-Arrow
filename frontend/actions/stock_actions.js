import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_STOCK_DATA = "RECEIVE_STOCK_DATA";
export const RECEIVE_STOCK_INTRADAY_DATA = "RECEIVE_STOCK_INTRADAY_DATA";
export const RECEIVE_STOCK_INFO = "RECEIVE_STOCK_INFO";
export const RECEIVE_STOCK_NEWS = "RECEIVE_STOCK_NEWS";

export const receiveStock = (symbol, stock) => ({
  type: RECEIVE_STOCK,
  symbol,
  stock,
});

export const receiveStocks = stocks => ({
  type: RECEIVE_STOCKS,
  stocks,
});

export const receiveStockData = (symbol, stockData) => ({
  type: RECEIVE_STOCK_DATA,
  symbol,
  stockData,
});

export const receiveStockIntradayData = (symbol, stockIntradayData) => ({
  type: RECEIVE_STOCK_INTRADAY_DATA,
  symbol,
  stockIntradayData,
});

export const receiveStockInfo = (symbol, stockInfo) => ({
  type: RECEIVE_STOCK_INFO,
  symbol,
  stockInfo,
});

export const receiveStockNews = (symbol, stockNews) => ({
  type: RECEIVE_STOCK_NEWS,
  symbol,
  stockNews,
});


export const prefetchStock = symbol => dispatch => (
  StockApiUtil.fetchStock(symbol)
    .then(stock => dispatch(receiveStock(stock.tickerSymbol, stock)))
);

export const fetchStock = symbol => dispatch => {
  const fetchAll = () => Promise.all([
    dispatch(fetchStockData(symbol)),
    dispatch(fetchStockIntradayData(symbol)),
    dispatch(fetchStockInfo(symbol)),
    dispatch(fetchStockNews(symbol))
  ]);

  StockApiUtil.fetchStock(symbol)
    .then(stock => dispatch(receiveStock(stock.tickerSymbol, stock)))
    .then(fetchAll());
};

export const fetchStocks = symbol => dispatch => (
  StockApiUtil.fetchStocks()
    .then(stocks => dispatch(receiveStocks(stocks)))
);

export const fetchStockData = symbol => dispatch => (
  StockApiUtil.fetchStockData(symbol)
    .then(stockData => dispatch(receiveStockData(symbol, stockData)))
);

export const fetchStockIntradayData = symbol => dispatch => (
  StockApiUtil.fetchStockIntradayData(symbol)
    .then(stockIntraData => dispatch(receiveStockIntradayData(symbol, stockIntraData)))
);

export const fetchStockInfo = symbol => dispatch => (
  StockApiUtil.fetchStockInfo(symbol)
    .then(stockInfo => dispatch(receiveStockInfo(symbol, stockInfo)))
);

export const fetchStockNews = symbol => dispatch => (
  StockApiUtil.fetchStockNews(symbol)
    .then(stockNews => dispatch(receiveStockNews(symbol, stockNews)))
);

export const fetchStockIndexItemTest = symbol => dispatch => (
  StockApiUtil.fetchStock(symbol)
    .then(stock => dispatch(receiveStock(stock.tickerSymbol, stock)))
    .then(() => dispatch(fetchStockIntradayData(symbol)))
);

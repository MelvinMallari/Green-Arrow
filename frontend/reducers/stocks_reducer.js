import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS,
  RECEIVE_STOCK_DATA,
  RECEIVE_STOCK_INTRADAY_DATA,
  RECEIVE_STOCK_INFO,
  RECEIVE_STOCK_NEWS
} from '../actions/stock_actions';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_STOCK:
      newState[action.symbol] = action.stock;
      return newState;
    case RECEIVE_STOCKS:
      // Structure state for future calls. Only update non-existing keys.
      const keys = Object.keys(newState);
      for (let i = 0; i < action.stocks.length; i++) {
        let symbol = action.stocks[i].symbol;
        if (!keys.includes(symbol)) newState[symbol] = action.stocks[i]; 
      }
      return newState;
    case RECEIVE_STOCK_DATA:
      newState[action.symbol].stockData = action.stockData;
      return newState;
    case RECEIVE_STOCK_INTRADAY_DATA:
      newState[action.symbol].stockIntradayData = action.stockIntradayData;
      return newState;
    case RECEIVE_STOCK_INFO:
      newState[action.symbol].ceo = action.stockInfo.company.CEO;
      newState[action.symbol].industry = action.stockInfo.company.industry;
      newState[action.symbol].exchange = action.stockInfo.company.exchange;
      newState[action.symbol].website = action.stockInfo.company.website;
      newState[action.symbol].companyName = action.stockInfo.company.companyName;
      newState[action.symbol].description = action.stockInfo.company.description;
      newState[action.symbol].marketcap = action.stockInfo.stats.marketcap;
      newState[action.symbol].peRatio = action.stockInfo.stats.peRatioLow;
      newState[action.symbol].dividendYield = action.stockInfo.stats.dividendYield;
      newState[action.symbol].shortRatio = action.stockInfo.stats.shortRatio;
      return newState;
    case RECEIVE_STOCK_NEWS:
      newState[action.symbol].stockNews = action.stockNews;
      return newState;
    default:
      return state;
  }
}

export default stocksReducer;
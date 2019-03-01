import {
  RECEIVE_STOCK,
  RECEIVE_STOCKS,
  RECEIVE_STOCK_DATA,
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
      return action.stocks;
    case RECEIVE_STOCK_DATA:
      newState[action.symbol].stockData = action.stockData;
      return newState;
    case RECEIVE_STOCK_INFO:
      newState[action.symbol].ceo = action.stockInfo.CEO;
      newState[action.symbol].companyName = action.stockInfo.companyName;
      newState[action.symbol].description = action.stockInfo.description;
      newState[action.symbol].exchange = action.stockInfo.exchange;
      return newState;
    case RECEIVE_STOCK_NEWS:
      newState[action.symbol].stockNews = action.stockNews;
      return newState;
    default:
      return state;
  }
}

export default stocksReducer;
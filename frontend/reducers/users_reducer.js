import { RECEIVE_USER, RECEIVE_USER_DATA } from '../actions/session_actions';
import { ADD_WATCH, REMOVE_WATCH } from '../actions/watch_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState = merge({}, state);
  let currentUserId;
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id] : action.user });
    case RECEIVE_USER_DATA:
      return merge({}, state, { [action.userData.id] : action.userData });
    case ADD_WATCH:
      currentUserId = action.watch.userId;
      newState[currentUserId].watchedStocks.push(action.watch.tickerSymbol);
      return newState;
    case REMOVE_WATCH:
      currentUserId = action.watch.userId;
      let symbol = action.watch.tickerSymbol;
      let index = newState[currentUserId].watchedStocks.indexOf(symbol);
      if (index > -1) newState[currentUserId].watchedStocks.splice(index, 1);
      return newState;
    default:
      return state;
  }
}

export default usersReducer;
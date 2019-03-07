import { RECEIVE_TRANSACTION } from '../actions/transaction_actions';
import merge from 'lodash/merge';

const transactionsReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_TRANSACTION:
      newState = merge(newState, action.transaction);
      return newState;
    default:
      return state;
  }
}

export default transactionsReducer;
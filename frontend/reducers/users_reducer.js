import {RECEIVE_USER, RECEIVE_USER_DATA} from '../actions/session_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id] : action.user });
    case RECEIVE_USER_DATA:
      return merge({}, state, { [action.userData.id] : action.userData });
    default:
      return state;
  }
}

export default usersReducer;
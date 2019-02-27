import {RECEIVE_USER, LOGOUT_USER} from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullUser = {
  id: null,
}

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id] : action.user });
    case LOGOUT_USER:
      return _nullUser;
    default:
      return state;
  }
}

export default sessionReducer;
import * as SessionApiUtil from '../util/session_api_util';
import { fetchStockIntradayData } from './stock_actions';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveUser = user => ({
  type: RECEIVE_USER,
  user,
})

const receiveUserData = userData => ({
  type: RECEIVE_USER_DATA,
  userData,
});

const logoutUser = () => ({
  type: LOGOUT_USER,
});

const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});


export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const login = user => dispatch => (
  SessionApiUtil.login(user)
    .then(user => dispatch(receiveUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionApiUtil.logout()
    .then(() => dispatch(logoutUser()),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const signup = user => dispatch => (
  SessionApiUtil.signup(user)
    .then(user => dispatch(receiveUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const fetchUserData = userId => dispatch => (
  SessionApiUtil.fetchUserData(userId)
    .then(userData => dispatch(receiveUserData(userData)),
      errors => dispatch(receiveErrors(errors.responseJSON)))
);
import * as WatchAPIUtil from '../util/watch_api_util';

export const ADD_WATCH = "ADD_WATCH";
export const REMOVE_WATCH = "REMOVE_WATCH";

export const receiveAddWatch = watch => ({
  type: ADD_WATCH,
  watch,
});

export const receiveRemoveWatch = watch => ({
  type: ADD_WATCH,
  watch,
});

export const addWatch = watch => dispatch => (
  WatchAPIUtil.addWatch(watch)
    .then(watch => dispatch(receiveAddWatch(watch)))
);

export const removeWatch = watch => dispatch => (
  WatchAPIUtil.removeWatch(watch)
    .then(watch => dispatch(receiveRemoveWatch(watch)))
);
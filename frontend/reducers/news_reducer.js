import { RECEIVE_SPLASH_NEWS } from '../actions/news_actions';

const newsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SPLASH_NEWS:
      return action.splashNews;
    default:
      return state;
  }
}

export default newsReducer;

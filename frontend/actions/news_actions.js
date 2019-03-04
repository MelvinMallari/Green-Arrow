import * as NewsApiUtil from '../util/news_api_util';

export const RECEIVE_SPLASH_NEWS = "RECEIVE_SPLASH_NEWS";

export const receiveSplashNews = splashNews => ({
  type: RECEIVE_SPLASH_NEWS,
  splashNews,
});

export const fetchSplashNews = () => dispatch => (
  NewsApiUtil.fetchSplashNews()
    .then(splashNews => dispatch(receiveSplashNews(splashNews)))
);
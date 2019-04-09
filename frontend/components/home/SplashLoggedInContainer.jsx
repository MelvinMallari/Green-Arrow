import { connect } from 'react-redux';
import SplashLoggedIn from "./SplashLoggedIn";
import { logout, fetchUserData } from '../../actions/session_actions';
import { fetchStockIntradayData, fetchStocks } from '../../actions/stock_actions';
import { fetchSplashNews } from '../../actions/news_actions';

const mapStateToProps = ({entities: {stocks, news, users}, session}) => {
  return ({
    stocks: stocks,
    splashNews: news,
    currentUser: users[session.id],
  });
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: () => dispatch(fetchStocks()),
  fetchSplashNews: () => dispatch(fetchSplashNews()),
  fetchUserData: userId => dispatch(fetchUserData(userId)),
  fetchStockIntradayData: symbol => dispatch(fetchStockIntradayData(symbol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashLoggedIn);
import { connect } from 'react-redux';
import SplashLoggedIn from "./SplashLoggedIn";
import { logout } from '../../actions/session_actions';
import { fetchStock } from '../../actions/stock_actions';
import { fetchSplashNews } from '../../actions/news_actions';

const mapStateToProps = (state, ownProps) => {
  return ({
    stocks: state.entities.stocks,
    splashNews: state.entities.news
  });
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStock: (symbol) => dispatch(fetchStock(symbol)),
  fetchSplashNews: () => dispatch(fetchSplashNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashLoggedIn);
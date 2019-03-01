import { connect } from 'react-redux';
import SplashLoggedIn from "./SplashLoggedIn";
import { logout } from '../../actions/session_actions';
import { fetchStockData } from '../../actions/stock_actions';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStockData: (symbol) => dispatch(fetchStockData(symbol))
});

export default connect(null, mapDispatchToProps)(SplashLoggedIn);
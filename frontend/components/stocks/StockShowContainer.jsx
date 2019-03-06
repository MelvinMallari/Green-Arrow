import { connect } from 'react-redux';
import StockShow from './StockShow';
import { fetchStock } from '../../actions/stock_actions';
import { logout, fetchUserData } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.match.params.symbol;
  return ({
    symbol: symbol,
    stocks: state.entities.stocks,
    currentUserId: state.session.id,
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  logout: () => dispatch(logout()),
  fetchUserData: userId =>  dispatch(fetchUserData(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);
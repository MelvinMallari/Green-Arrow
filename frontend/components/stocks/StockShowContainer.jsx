import { connect } from 'react-redux';
import { fetchStock } from '../../actions/stock_actions';
import { fetchUserData } from '../../actions/session_actions';
import { createTransaction } from '../../actions/transaction_actions';
import StockShow from './StockShow';

const mapStateToProps = (state, ownProps) => {
  const symbol = ownProps.match.params.symbol;
  return ({
    symbol: symbol,
    stocks: state.entities.stocks,
    users: state.entities.users,
    currentUserId: state.session.id,
  });
}

const mapDispatchToProps = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  fetchUserData: userId =>  dispatch(fetchUserData(userId)),
  createTransaction: userTransaction => dispatch(createTransaction(userTransaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(StockShow);
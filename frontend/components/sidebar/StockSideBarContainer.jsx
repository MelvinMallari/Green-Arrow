import { connect } from 'react-redux';
import StockSideBar from './StockSideBar';
import { createTransaction } from '../../actions/transaction_actions';
import { addWatch, removeWatch } from '../../actions/watch_actions';
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  let currentUser = state.entities.users[state.session.id]
  return ({
    transactions: state.entities.transactions,    
    watched: currentUser.watchedStocks.includes(ownProps.stock.tickerSymbol),
    errors: state.errors.transaction
  });
}

const mapDispatchToProps = dispatch => ({
  createTransaction: transaction => dispatch(createTransaction(transaction)),
  addWatch: watch => dispatch(addWatch(watch)),
  removeWatch: watch => dispatch(removeWatch(watch)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockSideBar);
import { connect } from 'react-redux';
import StockSideBar from './StockSideBar';
import { createTransaction } from '../../actions/transaction_actions';
import { addWatch, removeWatch } from '../../actions/watch_actions';

const mapStateToProps = ({entities: { transactions }}) => {
  return ({
    transactions: transactions,    
  });
}

const mapDispatchToProps = dispatch => ({
  createTransaction: transaction => dispatch(createTransaction(transaction)),
  addWatch: watch => dispatch(addWatch(watch)),
  removeWatch: watch => dispatch(removeWatch(watch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StockSideBar);
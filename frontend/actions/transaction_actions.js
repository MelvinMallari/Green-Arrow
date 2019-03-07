import * as TransactionApiUtil from '../util/transaction_api_util';

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";

export const receiveTransaction = transaction => ({
  type: RECEIVE_TRANSACTION,
  transaction,
});

export const receiveTransactionErrors = transactionErrors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  transactionErrors,
});

export const createTransaction = userTransaction => dispatch => (
  TransactionApiUtil.createTransaction(userTransaction)
    .then(transaction => dispatch(receiveTransaction(transaction)),
      errors => dispatch(receiveTransactionErrors(errors.responseJSON)))
);
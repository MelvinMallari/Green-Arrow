class Api::TransactionsController < ApplicationController
  def show
    @transaction = Transaction.find_by(id: params[:id])
  end

  def index
    @transactions = current_user.transactions; 
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id

    transaction_total = @transaction.share_difference*@transaction.share_price
    shares_owned = current_user.portfolio_shares[@transaction.ticker_symbol]
    
    if @transaction.share_difference >= 0 && transaction_total > current_user.current_buying_power
      render json: ["Insufficient Buying Power"], status: 401
    elsif @transaction.share_difference <= 0 && shares_owned < @transaction.share_difference.abs
      render json: ["Insufficient Shares"], status: 401
    else
      if @transaction.save 
        render "api/transactions/show"
        # render json: ["Transaction Succesful"], status: 200
      else
        render json: @transaction.errors.full_messages, status: 422
      end
    end
    
  end

  def transaction_params
    params.require(:transaction).permit(:ticker_symbol, :share_difference, :share_price)
  end
end

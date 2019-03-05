class TransactionsController < ApplicationController
  def show
    
  end

  def index
    
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id
    @transaction.transaction_date = Time.now;
    if @transaction.save
      
    else

    end
    
  end

  def transaction_params
    params.require(:transaction).permit(:stock_id, :share_difference, :share_price)
  end
end

class Api::WatchesController < ApplicationController
  def index
    @watches = current_user.watches
  end
  
  def destroy
    @watch = current_user.watches.find_by(ticker_symbol: params[:ticker_symbol]) 
    if @watch
      @watch.destroy
      render "api/watches/show"
    else
      render json: @watch.errors.full_messages, status: 422
    end
  end
  
  def create
    @watch = Watch.new(watch_params)
    @watch.user_id = current_user.id
    if @watch.save
      render "api/watches/show"
    else
      render plain: "Stock not in watchlist", status: 422
    end
  end

  def watch_params
    params.require(:watch).permit(:ticker_symbol)
  end
end

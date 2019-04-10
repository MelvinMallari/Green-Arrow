class WatchesController < ApplicationController
  def index
    @watches = current_user.watches
  end
  
  def destroy
    @watch = current_user.watches.find(params[:ticker_symbol]) 
    @watch.destroy
  end
  
  def create
    @watch = Watch.new(watch_params)
    @watch.user_id = current_user.id

    if @watch.save
      render json: ["Watchlist add successful"], status: 200
    else
      render json: @watch.errors.full_messages, status: 422
    end

  end

  def watch_params
    params.require(:watch).permit(:ticker_symbol)
  end
end

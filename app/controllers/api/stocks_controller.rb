class Api::StocksController < ApplicationController
  def index
    @stocks = Stock.all    
  end

  def show
    @stock = Stock.find_by(ticker_symbol: params[:ticker_symbol])
  end
end

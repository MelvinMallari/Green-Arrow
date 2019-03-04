Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do 
    resource :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resource :stocks, only: [:index]
    get 'stocks/:ticker_symbol', :to => 'stocks#show'
    get 'stocks/', :to => 'stocks#index'
  end
end

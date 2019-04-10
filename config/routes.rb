Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do 
    resource :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resource :stocks, only: [:index]

    resource :transactions, only: [:create]
    get 'transactions/', :to => 'transactions#index'
    get 'transactions/:id', :to => 'transactions#show'

    resource :watches, only: [:create]
    get 'watches/', :to => 'watches#index'
    get 'watches/:ticker_symbol', :to => 'watches#destroy'

    get 'stocks/:ticker_symbol', :to => 'stocks#show'
    get 'stocks/', :to => 'stocks#index'
    get 'users/:id', :to => 'users#show'
  end
  match "*path", to: redirect('/'), via: :all
end

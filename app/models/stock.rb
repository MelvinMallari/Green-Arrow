class Stock < ApplicationRecord
  validates :ticker_symbol, :company_name, presence: true
  validates :ticker_symbol, uniqueness: true
end

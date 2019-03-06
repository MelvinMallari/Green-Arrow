# == Schema Information
#
# Table name: stocks
#
#  id            :bigint(8)        not null, primary key
#  ticker_symbol :string           not null
#  company_name  :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Stock < ApplicationRecord
  validates :ticker_symbol, :company_name, presence: true
  validates :ticker_symbol, uniqueness: true
end
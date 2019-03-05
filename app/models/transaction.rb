# == Schema Information
#
# Table name: transactions
#
#  id               :bigint(8)        not null, primary key
#  user_id          :integer          not null
#  share_difference :integer          not null
#  share_price      :float            not null
#  transaction_date :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  ticker_symbol    :string           not null
#

class Transaction < ApplicationRecord
  validates :user_id, :stock_id, :share_difference, :share_price, :transaction_date, presence: true
  belongs_to :user
  before_save :default_values

  private
  def default_values
    self.transaction_date ||= Time.now
  end
end

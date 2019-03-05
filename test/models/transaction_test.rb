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

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

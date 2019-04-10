# == Schema Information
#
# Table name: watches
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  ticker_symbol :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class WatchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

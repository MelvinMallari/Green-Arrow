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

class Watch < ApplicationRecord
  validates :user_id, :ticker_symbol, presence: true
  belongs_to :user
end

# == Schema Information
#
# Table name: transactions
#
#  id               :bigint(8)        not null, primary key
#  user_id          :integer          not null
#  stock_id         :integer          not null
#  share_difference :integer          not null
#  share_price      :float            not null
#  transaction_date :datetime         not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Transaction < ApplicationRecord
  validates :user_id, :stock_id, :share_difference, :share_price, :transaction_date, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :stock,
    primary_key: :id,
    foreign_key: :stock,
    class_name: :Stock

end

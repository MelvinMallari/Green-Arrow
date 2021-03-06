# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  buying_power    :float
#

require 'net/http'

class User < ApplicationRecord
  before_validation :ensure_session_token
  validates :username, :session_token, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true
  before_save :default_values

  has_many :transactions 
  has_many :watches 

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def current_buying_power
    total = self.buying_power
    self.transactions.each do |transaction|
      # -= because positive share_difference corresponds to buying
      total -= transaction.share_difference*transaction.share_price
    end
    total
  end

  def portfolio_shares
    owned_shares = Hash.new(0)
    self.transactions.each do |transaction|
      owned_shares[transaction.ticker_symbol] += transaction.share_difference
    end
    owned_shares
  end

  def watched_stocks
    self.watches.map { |watch| watch['ticker_symbol'] }
  end


  private
  def default_values
    self.buying_power ||= "100000";
  end
end
  

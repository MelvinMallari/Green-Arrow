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

class User < ApplicationRecord
  before_validation :ensure_session_token
  validates :username, :session_token, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true
  before_save :default_values

  has_many :transactions 

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

  def five_year_portfolio
    stocks = portfolio_shares

    url = 'https://api.iextrading.com/1.0/stock/market/batch?types=chart&range=5y&symbols='
    stocks.each { |symbol, _| url += "#{symbol}," }
    uri = Net::HTTP.get(URI(url))
    response = JSON.parse(uri)

    res_data = Hash.new(0)
    stocks.each do |symbol, share_amount|
      chart_data = response[symbol]['chart']
      chart_data.each do |data_point| 
        res_data[data_point['date']] += data_point['close'] * share_amount
      end
    end

    res_data
  end

  private
  def default_values
    self.buying_power ||= "100000";
  end
end

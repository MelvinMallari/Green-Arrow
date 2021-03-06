# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do 
  User.destroy_all
  Stock.destroy_all
  Transaction.destroy_all

  demo_account = User.create({username: "jordanWOLFbelfort", password:"password"})

  exchange_files = Dir.glob("#{Rails.root}/exchange_data/**/*");

  def create_stock_given_line(line)
    data = line.split(",")
    ticker = data[0].delete("\"")
    name = data[1].delete("\"")
    Stock.create(ticker_symbol: ticker, company_name: name)
  end

  exchange_files.each do |file|
    File.foreach(file) { |line| create_stock_given_line(line) }
  end

  Transaction.create!(user_id: User.first.id, 
                        share_difference: 10, 
                        share_price: 42, 
                        transaction_date: DateTime.now.to_date,  
                        ticker_symbol: "AAPL")

  Transaction.create!(user_id: User.first.id, 
                        share_difference: 8, 
                        share_price: 50, 
                        transaction_date: DateTime.now.to_date,  
                        ticker_symbol: "TSLA")

  Watch.create!(user_id: User.first.id, ticker_symbol: "TSLA")
end
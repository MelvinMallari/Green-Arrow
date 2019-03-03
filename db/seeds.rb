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

  demo_account = User.create({username: "dannyYAMMENonThem", password:"password"})

  # Demo Stock
  Stock.create(ticker_symbol: 'AAPL', company_name: 'Apple Inc.');
  Stock.create(ticker_symbol: 'GOOGL', company_name: 'Alphabet Inc.');
  Stock.create(ticker_symbol: 'DIS', company_name: 'The Walt Disney Company');

end
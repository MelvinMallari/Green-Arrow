json.array! @stocks do |stock|
  json.symbol stock.ticker_symbol
  json.name stock.company_name
end
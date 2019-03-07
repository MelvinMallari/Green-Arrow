json.extract! @stock, :id, :ticker_symbol, :company_name
json.id @stock.id
json.tickerSymbol @stock.ticker_symbol
json.companyName @stock.company_name
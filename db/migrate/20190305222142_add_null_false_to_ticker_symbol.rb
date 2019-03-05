class AddNullFalseToTickerSymbol < ActiveRecord::Migration[5.2]
  def change
    change_column :transactions, :ticker_symbol, :string, null: false
  end
end

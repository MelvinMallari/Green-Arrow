class RemoveStockIdAddTickerSymbolToTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :stock_id, :integer
    add_column :transactions, :ticker_symbol, :string
  end
end

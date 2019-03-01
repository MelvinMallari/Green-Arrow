class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker_symbol, null: false
      t.string :company_name, null: false
      t.timestamps
    end
    add_index :stocks, :ticker_symbol, unique: true
    add_index :stocks, :company_name, unique: true
  end
end

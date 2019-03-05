class AddIndexingToTransactionsForeignKeys < ActiveRecord::Migration[5.2]
  def change
    add_index :transactions, :user_id, unique: true
    add_index :transactions, :stock_id, unique: true
  end
end

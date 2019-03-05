class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id, null: false
      t.integer :stock_id, null: false
      t.integer :share_difference, null: false
      t.float :share_price, null: false
      t.datetime :transaction_date, null:false
      t.timestamps
    end
  end
end

class CreateWatches < ActiveRecord::Migration[5.2]
  def change
    create_table :watches do |t|
      t.integer :user_id, null: false
      t.string :ticker_symbol, null: false

      t.timestamps
    end
    add_index :watches, [:ticker_symbol, :user_id], unique: true
  end
end

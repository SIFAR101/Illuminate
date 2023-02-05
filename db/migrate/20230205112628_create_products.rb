class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :brand
      t.text :description
      t.decimal :retail_price
      t.string :category
      t.text :ingredients
      t.string :color
      t.decimal :user_rating
      t.integer :bonus_points

      t.timestamps
    end
  end
end

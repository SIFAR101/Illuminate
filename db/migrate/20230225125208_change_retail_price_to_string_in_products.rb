class ChangeRetailPriceToStringInProducts < ActiveRecord::Migration[7.0]
  def change
    change_column :products, :retail_price, :string
  end
end

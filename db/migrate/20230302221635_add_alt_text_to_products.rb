class AddAltTextToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :alt_text, :string
  end
end

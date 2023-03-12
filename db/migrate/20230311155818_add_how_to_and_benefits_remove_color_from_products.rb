class AddHowToAndBenefitsRemoveColorFromProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :how_to, :string
    add_column :products, :benefits, :string
    remove_column :products, :color
  end
end

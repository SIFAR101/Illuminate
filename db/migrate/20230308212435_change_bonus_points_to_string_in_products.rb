class ChangeBonusPointsToStringInProducts < ActiveRecord::Migration[7.0]
  def change
    change_column :products, :bonus_points, :string
  end
end

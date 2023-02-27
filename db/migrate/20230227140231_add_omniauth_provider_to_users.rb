class AddOmniauthProviderToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string

    # Index for faster lookups
    add_index :users, [:provider, :uid], unique: true
  end
end

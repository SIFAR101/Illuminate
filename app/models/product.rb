class Product < ApplicationRecord
  acts_as_favoritable
  what3words = What3Words::API.new(:key => "S8VC3X2X")
end

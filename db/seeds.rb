# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# <%= @product.name %>
# <%= @product.brand %>
# <%= @product.description %>
# <%= @product.retail_price %>
# <%= @product.category %>
# <%= @product.color %>
# <%= @product.ingredients %>
# <%= @product.user_rating %>
# <%= @product.bonus_points %>
puts "Creating one product"
Product.create!(name: "All Day Foundation", brand: "Estée Lauder",
                description: "This medium coverage foundation can be worn up to 8 hours with no smudging.
                              Coming in 32 shades, you'll be able to find your perfect match.",
                retail_price: '$40.00', category: "Makeup", color: "Sienna", ingredients: "Water, Oil, Cream",
                user_rating: 0, bonus_points: "No Animal Testing")

puts "Product created."

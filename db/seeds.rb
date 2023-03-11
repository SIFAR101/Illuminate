# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

puts "Deleting all products..."
Product.destroy_all
puts "Creating one product"
Product.create!(name: "All Day Foundation", brand: "Estée Lauder",
                description: "This medium coverage foundation can be worn up to 8 hours with no smudging.
                              Coming in 32 shades, you'll be able to find your perfect match.",
                retail_price: '$40.00', category: "Makeup", how_to: "<ul> <li>Apply using a foundation brush. <br></li>
                <li>Start at the centre of the face to deposit the most pigment where skin tends to be the most red and uneven. <br></li>
                <li>Blend outwards toward the hairline and jawline.<br></li> <li>Build more coverage if desired.</li> </ul> ",
                benefits: "<p>This foundation feels lightweight and so comfortable, you won’t believe it’s super-long wear with no
                touch-ups needed throughout the day. It stays colour-true and unifies uneven skin tone, covers imperfections and won’t
                look grey on deeper skin tones. It is oil-free and oil-controlling, waterproof and transfer-resistant, so lasts in hot and humid weather.</p> ",
                ingredients: "Water, Oil, Cream",
                user_rating: 4.5, bonus_points: "No Animal Testing", image_url: "https://media.ulta.com/i/ulta/2586152?w=250&h=250",
                alt_text: "Long-Wear Makeup from Estée Lauder")

puts "Product created."

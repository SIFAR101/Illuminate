Welcome to Illuminate! 

This is our submission to the Estée Lauder Beauty Hackathon technical track. You can use it on your computer or mobile device here: https://illuminate-us.onrender.com/

You can also check out our [DevPost submission](https://devpost.com/software/le-wagon-el-hackathon-project).
<img width="1508" alt="Screen Shot 2023-03-16 at 21 30 14" src="https://user-images.githubusercontent.com/59029920/225745793-c923e132-869e-4e3f-b880-13fd26d5599c.png">

Illuminate is an app that improves the beauty shopping experience for visually-impaired persons where we bring product information to a user’s device where they can better read or listen to it and call for in-store assistance when necessary.

Our tech stack includes Ruby on Rails, PostgreSQL, Bootstrap, ZXing JS Library, Google Maps API and the Sephora API. Lastly, we have created the QR Codes using Bitly's generator and deployed our app on Render.

On the front end, we took special care to choose fonts that were made with accessibility in mind. The Zilla Slab font used for headers is a similar Google Font version to the oft-praised Rockwell font. For the body text, we used Atkinson Hyperlegible was developed "specifically to increase legibility for readers with low vision, and to improve comprehension." (Google Fonts)

A really big thanks to the API Dojo for creating and updating the Sephora API after I asked some questions about their API calls. We took a particular interest in this API because it's made for Sephora which is an international beauty store known for selling a large selection of beauty, skincare, hair care and perfume brands. Essentially, we wouldn't have been able to find a better foundation to work with. This gives users a home where they can find a better shopping experience until all beauty brands adhere to a universal database/standard.

We used the ZXing JS Library for our QR Code scanner as it is one of the most reliable open-source in-browser 1D/2D scanners that work across browsers and devices.

Finally, the Google Maps API allowed us to easily locate the user and place them next to their nearest Sephora where they will be able to call if in-person assistance is needed.

Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.

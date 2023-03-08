class ProductsController < ApplicationController
  before_action :store_location, only: [:show]

  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
  end

  # def favorite
  #   @product = Product.find(params[:id])
  #   current_user.favorite(@product)
  #   redirect_to product_path(@product)
  # end

  def new
    @product = Product.new
  end

  def search
    # Search method to display data returned from API w/o creating the product.
    if Product.exists?(barcode: params[:query].to_s)
      redirect_to product_path(Product.find_by(barcode: params[:query]).id)
    elsif find_product(params[:query]).nil?
      redirect_to error_products_path
    else
      @product = find_product(params[:query])
      @product = find_product_details(@product['attributes']['product-id'])
      @product = @product['data']['attributes']
      @product = Product.new(image_url: @product['images-urls'][0], name: @product['name'] , brand: @product['brand-name'],
                            description: @product['description'].gsub!('<br><br>','<br>'), ingredients: @product['ingredients'].gsub!('<br><br>','<br>'),
                            retail_price: @product['display-price'], user_rating: @product['rating'], barcode: params[:query])
      # Flash alert needs to be created
      puts @product.valid?
      if @product.save
        redirect_to product_path(@product)
      else
      # flash[:alert] = "Product not found"
        redirect_to error_products_path
      end
    end
  end

  def error
  end

  def create
    @product = Product.new(product_params)
    @product.save!
    redirect_to product_path(@product)
  end

  def edit
    @product = Product.find(params[:id])
  end

  def update
    @product = Product.find(params[:id])
    @product.update(product_params)
    redirect_to product_path(@product)
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    redirect_to products_path, status: :see_other
  end

  def user_favorites
    @products = []
    @favorites = current_user.all_favorites
    @favorites.each { |favorite| @products << Product.find(favorite.favoritable_id) }
  end

  private
  require "rubygems"
  require "excon"
  require "json"
  require "open-uri"

  def store_location
    session[:user_return_to] = request.fullpath if current_user.nil?
  end

  def product_params
    params.require(:product).permit(:name, :brand, :description, :retail_price,
                                    :category, :ingredients, :color, :user_rating,
                                    :bonus_points)
  end

  def request_api(url)
    response = Excon.get(
      url,
      headers: {
        'X-RapidAPI-Host' => URI.parse(url).host,
        'X-RapidAPI-Key' => ENV.fetch('RAPIDAPI_API_KEY')
      }
    )
    return nil if response.status != 200
    JSON.parse(response.body)
  end

  def find_product(barcode)
    raise "Barcode is nil" if barcode.nil?
    request_api("https://sephora.p.rapidapi.com/products/v2/search-by-barcode?upcs=#{barcode}")
  end

  def find_product_details(product_id)
    request_api("https://sephora.p.rapidapi.com/products/v2/detail?id=#{product_id}")
  end

end

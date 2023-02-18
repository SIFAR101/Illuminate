class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
      @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
  end

  def search
    # Search method to display data returned from API w/o creating the product.
    @product = find_product(params[:query])

    # Flash alert needs to be created
    unless @product
      flash[:alert] = "Product not found"
      return render action :new
    end

    # Hard coding one product in order to see if we can get the info from the API
    # Without knowing the barcodes of certain products, it's best to hard code this to move forward w/ front-end.
    @product = find_product_details('P258612', '1237379')

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

  private
  require "rubygems"
  require "excon"
  require "json"
  require "open-uri"

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
    request_api("https://sephora.p.rapidapi.com/products/search-by-barcode?upccode=#{barcode}")
  end

  def find_product_details(product_id, sku)
    request_api("https://sephora.p.rapidapi.com/products/detail?productId=#{product_id}&preferedSku=#{sku}")
  end

end

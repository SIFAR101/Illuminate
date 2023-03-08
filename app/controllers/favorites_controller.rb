class FavoritesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorites = current_user.favorites
  end

  def create
    @favorite = current_user.favorites.build(favorite_params)
    if @favorite.save
      render json: { favorited: true }
    else
      render json: { favorited: false }
    end
  end

  def destroy
    @favorite = current_user.favorites.find_by(favoritable_id: params[:id])
    if @favorite.destroy
      render json: { favorited: false }
    else
      render json: { favorited: true }
    end
  end

  private

  def favorite_params
    params.permit(:favoritable_type, :favoritable_id)
  end
end

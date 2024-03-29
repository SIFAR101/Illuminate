Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  get 'products/assistance', :to => 'products#assistance'
  resources :products do
    collection do
      get :search, :error, :user_favorites
    end
    member do
      post :favorite
      post :unfavorite
    end
  end
  root to: "pages#home"
  get '/welcome', to: 'pages#welcome'
  get '/terms-and-conditions', to: 'pages#terms'
  get '/privacy-policy', to: 'pages#privacy'
  get '/offline', to: 'pages#offline'



  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

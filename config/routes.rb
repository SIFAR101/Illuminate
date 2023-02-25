Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  resources :products do
    collection do
      get :search, :error
    end
    member do
      get :favorite
    end
  end
  root to: "pages#home"
  get '/welcome', to: 'pages#welcome'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

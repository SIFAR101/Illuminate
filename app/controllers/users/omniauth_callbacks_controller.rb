# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def callback
      # Check if the user is already signed in
      if user_signed_in?
        # Check if the current user's email matches the email from the omniauth info
        if current_user.email == request.env['omniauth.auth'].info.email
          # If the email addresses match, update the user's information from the omniauth data
          current_user.update(provider: request.env['omniauth.auth'].provider, uid: request.env['omniauth.auth'].uid)
          redirect_to after_sign_in_path_for(current_user), notice: "Successfully connected to #{request.env['omniauth.auth'].provider.capitalize}."
        else
          # If the email addresses don't match, show an error message
          redirect_to new_user_session_path, alert: "Email addresses don't match."
        end
      else
        # If the user is not signed in, create or find the user based on the omniauth data
        user = User.from_omniauth(request.env['omniauth.auth'])

        if user.save
          sign_in_and_redirect user, event: :authentication
          flash[:success] = t 'devise.omniauth_callbacks.success', kind: auth.provider.capitalize
        else
          flash[:alert] = user.errors.full_messages.join(", ")
          redirect_to new_user_session_path
        end
      end
    end

    %w[google_oauth2 facebook].each do |provider|
      define_method provider do
        callback
      end
    end

    protected

    def after_omniauth_failure_path_for(_scope)
      new_user_session_path
    end

    def after_sign_in_path_for(resource_or_scope)
      stored_location_for(resource_or_scope) || root_path
    end

    private

    def auth
      @auth ||= request.env['omniauth.auth']
    end
  end
end

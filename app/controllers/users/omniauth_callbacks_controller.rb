# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def callback
      user = User.from_omniauth(request.env['omniauth.auth'])

      sign_out_all_scopes

      if user.save
      flash[:success] = t 'devise.omniauth_callbacks.success', kind: auth.provider.capitalize
      sign_in_and_redirect user, event: :authentication

      else
        flash[:alert] = user.errors.full_messages.join(", ")
        redirect_to new_user_session_path
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

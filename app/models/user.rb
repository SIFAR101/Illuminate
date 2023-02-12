class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, omniauth_providers: %i[google_oauth2 facebook]

         def self.from_omniauth(auth)
          user = User.where(email: auth.info.email).first
          if user
            user.update(provider: auth.provider, uid: auth.uid)
          else
            user = User.create(
              email: auth.info.email,
              password: Devise.friendly_token[0,20],
              full_name: auth.info.name,
              provider: auth.provider,
              uid: auth.uid
            )
          end
          user
        end
      end

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, omniauth_providers: %i[google_oauth2 facebook]

  def self.from_omniauth(auth)
    user = User.find_or_initialize_by(email: auth.info.email)
    user.assign_attributes(full_name: auth.info.name, provider: auth.provider)
    if user.save
      user
    else
      raise user.errors
    end
  end
end

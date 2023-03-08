// Entry point for the build script in your package.json

import { Application } from "@hotwired/stimulus"
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"
import "@zxing/library"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

export { application }

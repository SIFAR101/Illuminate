import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "heart", "text" ]

  toggle() {
    const heartIcon = this.heartTarget
    const text = this.textTarget

    heartIcon.classList.toggle('fa-regular')
    heartIcon.classList.toggle('fa-solid')
    text.textContent = heartIcon.classList.contains('fa-solid') ? "This product is in your favorites!" : "Add to your favorites"
  }
}

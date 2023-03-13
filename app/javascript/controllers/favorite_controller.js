import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "heart", "text" ]

  toggle() {
    const heartIcon = this.heartTarget
    const text = this.textTarget
    const productId = this.element.dataset.productId

    heartIcon.classList.toggle('fa-regular')
    heartIcon.classList.toggle('fa-solid')
    text.textContent = heartIcon.classList.contains('fa-solid') ? "This product is in your favorites!" : "Add to your favorites"
  }
}
// export default class extends Controller {
//   static targets = [ "heart" ]
//   static values = {
//     product: Object,
//     user: Object
//   }
//   connect(){
//     console.log("Favorite Controller version 1 connected.")
//     this.addToFavorites()

//   }
//   addToFavorites(event){
//     console.log(event)
//   }
// }

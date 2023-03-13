import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "heart" ]
  static values = {
    product: Object,
    user: Object
  }
  connect(){
    console.log("Favorite Controller version 1 connected.")
    this.addToFavorites()

  }
  addToFavorites(event){
    event.preventDefault()
    console.log(event)
  }
}

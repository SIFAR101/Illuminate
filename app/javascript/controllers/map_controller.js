import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    // markers: Array this is an unused function right now
  }

  connect() {
    console.log("sortable controller connected")
    mapboxgl.accessToken = this.apiKeyValue

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-24, 42], // starting center in [lng, lat]
      zoom: 1 // starting zoom
      });

    map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
    );
  }

  fetchStores() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a7fa530355mshba4e0f21281f064p1daf8fjsn38e1d307e269',
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
      }
    };

    fetch('https://sephora.p.rapidapi.com/stores/list?latitude=33.9733&longitude=-118.2487&radius=25', options)
	    .then(response => response.json())
	    .then(response => console.log(response))
	    .catch(err => console.error(err));
  }

  fetchStores()
}

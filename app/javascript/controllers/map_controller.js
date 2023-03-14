import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    // markers: Array this is an unused function right now
  }

  connect() {
    console.log("Map controller v6 connected")
    mapboxgl.accessToken = this.apiKeyValue

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-24, 42], // starting center in [lng, lat]
      zoom: 1 // starting zoom
      });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })

      map.addControl(geolocate);

      geolocate.on('geolocate', (e) => {
        const userCoords = [e.coords.longitude, e.coords.latitude]
        console.log('coords', userCoords)
        this.fetchStores(userCoords[0], userCoords[1])

      })
  }

  fetchStores(lng, lat) {

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/sephora.json?proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
	    .then(response => response.json())
	    .then(response => console.log(response))
	    .catch(err => console.error(err));
  }
}

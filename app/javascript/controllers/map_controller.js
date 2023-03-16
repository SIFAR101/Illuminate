import { Controller } from "@hotwired/stimulus"
import { Loader } from "@googlemaps/js-api-loader"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {
    apiKey: String,
    // markers: Array this is an unused function right now
  }
  // connect() {
  //   console.log("Map controller v6 connected")
  //   mapboxgl.accessToken = this.apiKeyValue

  //   const map = new mapboxgl.Map({
  //     container: 'map', // container ID
  //     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  //     style: 'mapbox://styles/mapbox/streets-v12', // style URL
  //     center: [-24, 42], // starting center in [lng, lat]
  //     zoom: 1 // starting zoom
  //     });

  //   const geolocate = new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //     enableHighAccuracy: true
  //     },
  //     // When active the map will receive updates to the device's location as it changes.
  //     trackUserLocation: true,
  //     // Draw an arrow next to the location dot to indicate which direction the device is heading.
  //     showUserHeading: true
  //     })

  //     map.addControl(geolocate);

  //     geolocate.on('geolocate', (e) => {
  //       const userCoords = [e.coords.longitude, e.coords.latitude]
  //       console.log('coords', userCoords)
  //       this.fetchStores(userCoords[0], userCoords[1])

  //     })
  // }
  connect() {
    console.log('Google Maps controller v6 is loaded.')
    const loader = new Loader({
      apiKey: this.apiKeyValue,
      version: "weekly",
      libraries: ["places"]
    })
    loader.load().then(() => {
      this.initMap()
    })
  }

  initMap() {
    const infoWindow = new google.maps.InfoWindow();
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -24 , lng: 42 },
      zoom: 14
    });
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          },
          () => { handleLocationError(true, infoWindow, map.getCenter()); }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowWindow, map.getCenter());
      }
    const request = { query: 'Sephora', fields: ['place_id', 'name', 'geometry'] }
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK){
          for (var i= 0; i < results.length; i++){
            console.log('results', results)
            this.createMarker(results[i], map);
          }
          const nearestStore = results[0]

          map.setCenter(nearestStore.geometry.location)
          const storeDetailsRequest =  {
            placeId: nearestStore.place_id,
            fields: ['name', 'rating', 'formatted_phone_number','formatted_address', 'geometry']
          };

          service.getDetails(storeDetailsRequest, (place, status) => {
            console.log('details', place)
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              place &&
              place.geometry &&
              place.geometry.location
            ) {
              const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
              })
              map.setCenter(marker)
              const content =
              `<div class="infoWindow">
                <h3>Sephora</h3>
                <h3 class="fw-light text-primary"><a class="text-primary" aria-label="Call this Sephora location." href="tel:${place.formatted_phone_number}"><i class="fa-solid fa-phone fs-4 text-primary"></i> ${place.formatted_phone_number}</a></h3>
                <h4 class="fw-light">${place.formatted_address}</h4>
              </div>`

              infoWindow.setContent(content);
              infoWindow.open(map, marker);
            }
          });
        }
      })
  }

  createMarker(place, map) {
    const infoWindow = new google.maps.InfoWindow()
    console.log(place.geometry)
    if (!place.geometry || !place.geometry.location) return;
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.setContent(place.name || "");
      infoWindow.open(map);
    });
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }


  fetchStores(lng, lat) {

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/sephora.json?proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
	    .then(response => response.json())
	    .then(response => console.log(response))
	    .catch(err => console.error(err));
  }
}
import { Controller } from "@hotwired/stimulus"
import { Loader } from "@googlemaps/js-api-loader"

// Connects to data-controller="map"
export default class extends Controller {
  static values = { apiKey: String }

  connect() {
    console.log('Google Maps controller is loaded.')
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
      zoom: 14,
      disableDefaultUI: true
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
              `<div class="infoWindow" aria-label="Sephora Address Info Window">
              <span class="sr-only">You are currently in the following store: </span>
              <h3>Sephora</h3>
              <span class="sr-only">Located in </span>
              <h4 class="fw-light ">${place.formatted_address}</h4>
              <span class="sr-only">To call for assistance, please press on the following phone number button: </span>
                <h3 class="fw-light text-primary"><a class="text-primary" aria-label="Call this Sephora location." href="tel:${place.formatted_phone_number}"><i class="fa-solid fa-phone fs-4 text-primary"></i> ${place.formatted_phone_number}</a></h3>


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
}

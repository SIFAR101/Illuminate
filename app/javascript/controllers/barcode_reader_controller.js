import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="barcode-reader"
export default class extends Controller {
  connect() {
    window.addEventListener('load', function () {
      let selectedDeviceId;
      const codeReader = new ZXing.BrowserMultiFormatReader()
      console.log('ZXing code reader initialized')
      codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {
          const sourceSelect = document.getElementById('sourceSelect')
          selectedDeviceId = videoInputDevices[0].deviceId

          // Removed "Start" link. When the video div is clicked, scan begins.
          document.getElementById('video').addEventListener('click', () => {
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
              if (result) {
                console.log(result)
                document.getElementById('query').textContent = result.text
                document.getElementById('barcode-form').submit()
              }
              if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err)
                document.getElementById('result').textContent = err
              }
            })
            console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
          })

          // This reset is not really necessary. If the product isn't found, we render the product#new page again with a flash alert that
          // the product hasn't been found.
          document.getElementById('resetButton').addEventListener('click', () => {
            codeReader.reset()
            document.getElementById('result').textContent = '';
            console.log('Reset.')
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }
}

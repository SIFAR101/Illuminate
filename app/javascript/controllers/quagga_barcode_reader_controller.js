import { Controller } from "@hotwired/stimulus"
import Quagga from 'quagga';

export default class extends Controller {
  connect() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.element
      },
      decoder: {
        readers: ["ean_reader"]
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      }
    }, function (err) {
      if (err) {
        const errorMessageEl = document.getElementById("quagga-error-message");
        if (errorMessageEl) {
          errorMessageEl.innerText = err;
        }
        return;
      }

      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected(function (data) {
      const barcodeResultEl = document.getElementById("quagga-barcode-result");
      if (barcodeResultEl) {
        barcodeResultEl.innerText = data.codeResult.code;
      }
      console.log("Barcode detected and processed: " + data.codeResult.code, data);
    });
  }
}

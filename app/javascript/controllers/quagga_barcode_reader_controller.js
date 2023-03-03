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

    let processedCode = false; // Keep track of whether a code has been processed or not

    Quagga.onDetected(function (data) {
      // Only process the code if it hasn't been processed already
      if (!processedCode) {
        const barcodeResultEl = document.getElementById("quagga-barcode-result");
        if (barcodeResultEl) {
          barcodeResultEl.innerText = data.codeResult.code;
        }
        console.log("Barcode detected and processed: " + data.codeResult.code, data);

        // Set the processedCode flag to true so that the same code isn't processed again
        processedCode = true;

        // Do whatever you need to do with the code here
        // Call your API or perform any other actions
        // ...
      }
    });
  }
}

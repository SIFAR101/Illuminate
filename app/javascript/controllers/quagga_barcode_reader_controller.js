import { Controller } from "@hotwired/stimulus"
import Quagga from '@ericblade/quagga2';

export default class extends Controller {
  connect() {
    const constraints = {
      video: {
        facingMode: 'environment',
        autoFocus: true,
        exposureMode: 'auto'
      }
    }
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.element,
        constraints: constraints
      },
      decoder: {
        readers: ["ean_reader", "upc_reader"],
        config: {
          minLength: 12,
          codeRepetition: true,
          minConfidence: 0.9,
          errorCorrectionLevel: 'L'
        },
        multiple: false
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

      console.log("Initialization finished with version Barcode. Ready to start");
      Quagga.start();
    });

    let processedCode = false; // Keep track of whether a code has been processed or not
    let codes = [];
    Quagga.onDetected(function (data) {
      // Only process the code if it hasn't been processed already
      const barcode = data.codeResult.code
        if (barcode.match(/[\d]{12,}/)){
          if (!processedCode) {
            const barcodeResultEl = document.getElementById("query");
            if (barcodeResultEl) {
              barcodeResultEl.innerText = barcode
              document.getElementById('barcode-form').submit()
            }

            if (window.navigator.vibrate) {
              window.navigator.vibrate(100)
            }
            console.log("Barcode detected and processed: " + data.codeResult.code, data);

        // Set the processedCode flag to true so that the same code isn't processed again
        processedCode = true;

        // Do whatever you need to do with the code here
        // Call your API or perform any other actions
        // ...
      }}
    });
  }
}

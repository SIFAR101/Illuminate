import { Controller } from "@hotwired/stimulus";
import Quagga from '@ericblade/quagga2';

export default class extends Controller {
  connect() {
    const constraints = {
      video: {
        facingMode: 'environment',
        autoFocus: true,
        exposureMode: 'auto'
      }
    };
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
        patchSize: "medium", // default value is "medium"
        halfSample: true // default value is true
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

    let processedCode = false;
    Quagga.onDetected(function (data) {
      const barcode = data.codeResult.code;
      if (barcode.match(/[\d]{12,}/)){
        if (!processedCode) {
          const barcodeResultEl = document.getElementById("query");
          if (barcodeResultEl) {
            barcodeResultEl.innerText = barcode;
            document.getElementById('barcode-form').submit();
          }

          if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
          }
          console.log("Barcode detected and processed: " + data.codeResult.code, data);

          processedCode = true;
        }
      }
    });
  }
}

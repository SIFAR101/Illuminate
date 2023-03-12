import { Controller } from "@hotwired/stimulus";
import EasySpeech from "easy-speech"

export default class extends Controller {
  connect() {
    // const header = document.querySelector('h1')
    // console.log('Barcode Controller 1 loaded.')
    // window.addEventListener('load', function () {
    //   const codeReader = new ZXing.BrowserMultiFormatReader();

    //   codeReader.listVideoInputDevices()
    //     .then((videoInputDevices) => {
    //       const sourceSelect = document.getElementById('sourceSelect');

    //       let selectedDeviceId;
    //       let maxResolution = 0;

    //       videoInputDevices.forEach((device) => {
    //         if (device.label.indexOf("facing back") >= 0) {
    //           // Prefer back-facing cameras
    //           const { width, height } = device.videoConstraints;
    //           const resolution = width * height;
    //           if (resolution > maxResolution) {
    //             selectedDeviceId = device.deviceId;
    //             maxResolution = resolution;
    //           }
    //         }
    //       });

    //       if (!selectedDeviceId) {
    //         // If no back-facing camera found, select the first device
    //         selectedDeviceId = videoInputDevices[0].deviceId;
    //       }


    //         codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
    //           if (result) {
    //             console.log('result', result)
    //             document.getElementById('query').textContent = result.text
    //             // document.getElementById('barcode-form').submit()
    //           }
    //           if (err && !(err instanceof ZXing.NotFoundException)) {
    //             console.error(err)
    //             document.getElementById('result').textContent = err
    //             codeReader.reset()
    //             document.getElementById('result').textContent = '';
    //             console.log('Reset.')
    //           }
    //         })
    //         console.log(`Started continuous decode from camera with id ${selectedDeviceId}`)
    //     })
    //     .catch((err) => {
    //       console.error(err)
    //     })
    // })

    console.log("QR Code controller v2 loaded.");
    const reader = new ZXing.BrowserQRCodeReader();
    EasySpeech.init({ maxTimeout: 5000, interval: 250 })
      .then(() => console.debug("load complete"))
      .catch((e) => console.error(e));

    const stopScanner = () => {
      const video = document.querySelector('video');
      const tracks = video.srcObject?.getTracks();
      tracks?.forEach(track => track.stop());
      console.log("Camera stopped.");
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopScanner();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    reader
      .decodeFromInputVideoDevice(undefined, "video")
      .then((result) => {
        console.log("result", result.text);
        document.getElementById("query").value = result.text;

        const easySpeech = EasySpeech.detect();
        const appVoice = window.speechSynthesis.getVoices()[10];
        console.log("ES", easySpeech);
        EasySpeech.speak({
          text: "Product found",
          voice: appVoice,
          pitch: 1,
          rate: 1,
          volume: 2,
          boundary: (e) => console.debug("boundary reached"),
        });

        stopScanner();
        document.forms[0].submit();
      })
      .catch((error) => {
        console.error("error", error);
        stopScanner();
      });
  }
}

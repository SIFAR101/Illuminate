// Old barcode controller. Will delete code once we are happy with the Quagga Barcode Reader Controller.
// import { Controller } from "@hotwired/stimulus";

//  export default class extends Controller {
//   connect() {
//     const header = document.querySelector('h1')
//     console.log('Hello there.')
//     window.addEventListener('load', function () {
//       const codeReader = new ZXing.BrowserMultiFormatReader();

//       codeReader.listVideoInputDevices()
//         .then((videoInputDevices) => {
//           // Just want to see which devices are available
//           console.log('devices', videoInputDevices)

//           const sourceSelect = document.getElementById('sourceSelect');

//           let selectedDeviceId;
//           let maxResolution = 0;

//           videoInputDevices.forEach((device) => {
//             if (device.label.indexOf("facing back") >= 0) {
//               // Prefer back-facing cameras
//               const { width, height } = device.videoConstraints;
//               const resolution = width * height;
//               if (resolution > maxResolution) {
//                 selectedDeviceId = device.deviceId;
//                 maxResolution = resolution;
//               }
//             }
//           });

//           if (!selectedDeviceId) {
//             // If no back-facing camera found, select the first device
//             selectedDeviceId = videoInputDevices[0].deviceId;
//           }

//           document.getElementById('video-container').addEventListener('click', () => {
//             codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
//               if (result) {
//                 console.log(result)
//                 document.getElementById('query').textContent = result.text
//                 document.getElementById('barcode-form').submit()
//               }
//               if (err && !(err instanceof ZXing.NotFoundException)) {
//                 console.error(err)
//                 document.getElementById('result').textContent = err
//                 codeReader.reset()
//                 document.getElementById('result').textContent = '';
//                 console.log('Reset.')
//               }
//             })
//             console.log(`Started continuous decode from camera with id ${selectedDeviceId}`)
//           })

//           // document.getElementById('resetButton').addEventListener('click', () => {
//           //   codeReader.reset()
//           //   document.getElementById('result').textContent = '';
//           //   console.log('Reset.')
//           // })
//         })
//         .catch((err) => {
//           console.error(err)
//         })
//     })
//   }
// }

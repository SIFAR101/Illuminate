import { Controller } from "@hotwired/stimulus";
import EasySpeech from "easy-speech";

export default class extends Controller {
  connect() {
    console.log("QR Code controller v2 loaded.");
    this.startCamera();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.id === "video-container") {
              this.startCamera();
              return;
            }
          }
        }
      }
      this.stopCamera();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  disconnect() {
    this.stopCamera();
    console.log("Camera stopped on page change.");
  }

  startCamera() {
    const reader = new ZXing.BrowserQRCodeReader();
    EasySpeech.init({ maxTimeout: 5000, interval: 250 })
      .then(() => console.debug("load complete"))
      .catch((e) => console.error(e));

    const stopScanner = () => {
      const video = document.querySelector("video");
      const tracks = video.srcObject?.getTracks();
      tracks?.forEach((track) => track.stop());
      console.log("Camera stopped.");
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopScanner();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    reader
      .decodeFromInputVideoDevice(undefined, "video")
      .then((result) => {
        console.log("result", result.text);
        document.getElementById("query").value = result.text;

        const easySpeech = EasySpeech.detect();
        const appVoice = EasySpeech.voices()[0]
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

  stopCamera() {
    const video = document.querySelector("video");
    const tracks = video.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    console.log("Camera stopped.");
  }
}

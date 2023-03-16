// import { Controller } from "@hotwired/stimulus"

// // Connects to data-controller="homepage-app"
// export default class extends Controller {
//   connect() {

//     // anime({
//     //   targets: document.querySelector('.download-btn'),
//     //   scale: [1, 1.2],
//     //   duration: 1000,
//     //   direction: 'alternate',
//     //   loop: true,
//     //   easing: 'linear',
//     // });

//     // Hovering animation on button "Learn more"

//     // const button = document.querySelector('.learn-btn');
//     // button.addEventListener('mouseenter', () => {
//     //   anime({
//     //     targets: button,
//     //     scale: 1.1,
//     //     duration: 200,
//     //     easing: 'linear'
//     //   });
//     // });
//     // button.addEventListener('mouseleave', () => {
//     //   anime({
//     //     targets: button,
//     //     scale: 1,
//     //     duration: 200,
//     //     easing: 'linear'
//     //   });
//     // });

//     // Illuminate reflection animation

//     const headline = document.querySelector('.headline');
//     const headlineWidth = headline.offsetWidth;

//     headline.addEventListener('mouseenter', () => {
//       anime({
//         targets: headline.querySelector('::after'),
//         width: headlineWidth,
//       });
//     });

//     headline.addEventListener('mouseleave', () => {
//       anime({
//         targets: headline.querySelector('::after'),
//         width: 0,
//       });
//     });

//     const letters = document.querySelectorAll('.letter');

//     letters.forEach((letter) => {
//       anime({
//         targets: letter,
//         opacity: [0.3, 1],
//         easing: 'linear',
//         direction: 'alternate',
//         loop: true,
//         duration: 1000,
//         delay: anime.random(0, 1000),
//       });
//     });

//   }
// }

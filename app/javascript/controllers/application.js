import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }


// anime({
//   targets: document.querySelector('.headline'),
//   opacity: [0, 1],
//   translateY: [20, 0],
//   easing: 'easeOutExpo',
//   duration: 2000,
//   delay: 500
// });

anime({
  targets: document.querySelector('.learn-btn'),
  opacity: [0, 1],
  scale: [0.5, 1],
  easing: 'easeOutExpo',
  duration: 1500,
  delay: 1000
});

anime({
  targets: document.querySelectorAll('.paragraph-intro'),
  opacity: [0, 1],
  translateX: [-30, 0],
  easing: 'easeOutExpo',
  duration: 1000,
  delay: anime.stagger(500, {start: 1000})
});

anime({
  targets: document.querySelector('.download-btn'),
  scale: [1, 1.2],
  duration: 1000,
  direction: 'alternate',
  loop: true,
  easing: 'linear',
});


// Select the headline element
const headline = document.querySelector('.headline');

// Split the headline text into individual letters
const letters = headline.textContent.split('');

// Wrap each letter in a span element with a class of "letter"
headline.innerHTML = letters.map((letter) => {
  return `<span class="letter">${letter}</span>`;
}).join('');

// Define the animation properties for each letter
const letterAnimation = anime.timeline({loop: true})
  .add({
    targets: '.letter',
    translateY: ['-0.1em', '0.1em'],
    easing: 'easeInOutSine',
    duration: 500,
    delay: anime.stagger(50),
  })
  .add({
    targets: '.letter',
    translateY: ['0.1em', '-0.1em'],
    easing: 'easeInOutSine',
    duration: 500,
    delay: anime.stagger(50),
  });

// Start the animation
letterAnimation.play();

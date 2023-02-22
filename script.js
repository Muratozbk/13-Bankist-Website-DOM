'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click'
  , openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
//////////////////////////////////
/////////////////////////////////
//Selecting Elements---
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);


const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1');
//getElementsByTagName
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

///// Creating and  inserting elements ----------
//.insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true))
// header.before(message);
// header.after(message)

///////// Delete Elements----------
document.querySelector('.btn--close-cookie').
  addEventListener('click', function () {
    message.remove();
  });


////////// Styles /////
//// Styles ////
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);

message.style.height = Number.parseFloat
  (getComputedStyle(message).height, 10) + 30 + 'px';
console.log(getComputedStyle(message).height);
//setProperty
document.documentElement.style.setProperty
  ('--color-primary', 'orangered');

/////////
//// Attributes  -----------
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.getAttribute('src'))
console.log(logo.className);

logo.alt = 'new logo text';
console.log(logo.alt);

console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'))

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j')
logo.classList.remove('c', 'j')
logo.classList.toggle('c')
console.log(logo.classList.contains('c'));

console.log(logo.classList) section--1
*/
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (x/y)', window,
  //   pageXOffset, pageYOffset);

  // console.log('height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(
  // s1coords.left + window.pageXOffset,
  // s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({ behavior: 'smooth' });

});

///////////////////////////
////// Types of Events and Event Handlers  
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventlistener:  Great! That is heading. ');
  h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() =>
  h1.removeEventListener('mouseenter', alertH1), 3000);
// h1.onmouseenter = function (e) {
//   alert('addEventlistener:  Great2! That is heading. ')
// };
// h1.onclick = function (e) {
//   alert('addEventlistener:  Great3! That is heading. ');
// };

// 190













// const favoriteAnimal = 'shark';
// switch (favoriteAnimal) {
//   case 'bobcat':
//   case 'cat':
//     console.log('Cats are great')
//     break;
//   case 'dog': {
//     console.log('dogs are loud')
//     break
//   }
//   case 'shark':
//     console.log('good choice')
//     break
//   default: console.log('animal')
// };


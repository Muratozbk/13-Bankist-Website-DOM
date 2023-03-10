'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const nav = document.querySelector('.nav');
//Tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer =
  document.querySelector('.operations__tab-container');
const tabsContent =
  document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn =>
  btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////// Btn ScrollIntoView Section--1 /////////
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////
/// Page Navigation



// 1.Add Event Listener to common parent element
// 2.Determine what element originated the event

document.querySelector('.nav__links').addEventListener
  ('click', function (e) {
    e.preventDefault();
    // console.log(e.target);
    //Matching strtegy
    if (e.target.classList.contains('navscrl')) {
      const id = e.target.getAttribute('href');
      // console.log(id);
      document.querySelector(id)
        .scrollIntoView({ behavior: 'smooth' })
    }
  });

// document.querySelectorAll('.nav__link').forEach
//   (function (el) {
//     el.addEventListener('click', function (e) {
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       console.log(id);
//       document.querySelector(id)
//         .scrollIntoView({ behavior: 'smooth' })
//       // document.getElementById(`section--${i + 1}`)
//     })
//   });

//Tabbed Content - Operations__Content
//// Event Delegetion

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard Clause
  if (!clicked) return;
  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // ACtive Tab
  clicked.classList.add('operations__tab--active');
  //Active Content Area  // dataset.tab---
  // console.log(clicked.dataset.tab)
  tabsContent.forEach(
    op => op.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

////// Menu Fade Animations 
const handleHover = function (e) { //function (e, opacity)
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link)
        el.style.opacity = this; //opacity this oldu bind y??z??nden
    })
    logo.style.opacity = this;//function.bind(x)
  }
}
//// Passing argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//////// Sticky Navigation Bar 
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top)
//     nav.classList.add('sticky'); else
//     nav.classList.remove('sticky')
// });

///// Sticky Nav: Intersection Observer API IMPORTANT 

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// };
// const observer =
//   new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else nav.classList.remove('sticky')
};

const headerObserver = new IntersectionObserver(stickyNav,
  {
    root: null, threshold: 0,
    rootMargin: `-${navHeight.height}px`
  });
headerObserver.observe(header);


//// Reveal Sections Scrolling

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden') // ??? for now
});


//////////////
////////// Lazy Loading Images--

const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //Load eventhandler - filter gone after load done
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, threshold: 0,
  rootMargin: '200px'  //erken y??kleme yapmas?? i??in!
});
imgTarget.forEach(img => imgObserver.observe(img));


/////
//// Slider Component

const slider = function () {

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.5) ';
  // slider.style.overflow = 'visible';

  //// Functions
  //// Slider Dot Button Component
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class='dots__dot'
     data-slide= '${i}'></button>`);
    })
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide='${slide}']`).
      classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) =>
      s.style.transform =
      `translateX(${100 * (i - slide)}%)`)
  };

  //Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  //Prev Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else
      curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide)
  }
  //// Init Functions
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //// Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();  // shorcut !!
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const slide = e.target.dataset.slide
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//// Sticky Back To Page Top

const mybutton = document.querySelector('.upArrow');
const scrollFunction = function () {
  if (document.documentElement.scrollTop > 500) {
    mybutton.style.display = 'block';
  } else { mybutton.style.display = 'none' }
}
window.onscroll = () => scrollFunction()

mybutton.addEventListener('click', function () {
  document.documentElement.scrollTop = 0;
})






// const mybutton = document.querySelector('.upArrow');
// window.onscroll = () => scrollFunction();
// const scrollFunction = function () {
//   if (document.documentElement.scrollTop > 500) {
//     mybutton.style.display = 'block';
//   } else { mybutton.style.display = 'none' }
// };

// mybutton.addEventListener('click', function () {
//   document.documentElement.scrollTop = 0;
// })







////
// const cards = document.querySelectorAll('.card');

// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     entry.target.classList.toggle('show', entry.isIntersecting)
//     // if (entry.isIntersecting) observer.unobserve(entry.target);
//   })
//   console.log(entries)
// }, {
//   threshold: .5,
//   // root:null  ,
//   // rootMargin: '-100px'
// });

// const lastCardObserver = new IntersectionObserver(entries => {
//   const lastCard = entries[0]
//   if (!lastCard.isIntersecting) return;
//   loadNewCards()
//   lastCardObserver.unobserve(lastCard.target)
//   lastCardObserver.observe(document.querySelector('.card:last-child'))
// }, { rootMargin: '100px' })

// lastCardObserver.observe(document.querySelector('.card:last-child'))

// cards.forEach(card => {
//   observer.observe(card)
// });
// const cardContainer = document.querySelector('.card-container')

// function loadNewCards() {
//   for (let i = 0; i < 10; i++) {
//     const card = document.createElement('div');
//     card.textContent = 'New Card';
//     card.classList.add('card')
//     observer.observe(card)
//     cardContainer.append(card)
//   }
// }



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

document.querySelector('.nav__logo').onclick = () =>
  section1.scrollIntoView({ behavior: 'smooth' });


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


// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() *
  (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Link', e.target, e.currentTarget);
    console.log(this === e.currentTarget)

    //Stop Propagation
    // e.stopPropagation();
  });

document.querySelector('.nav__links').addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Container', e.target, e.currentTarget)
  });

document.querySelector('.nav').addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget)
  });


const h1 = document.querySelector('h1');

///// Going Downwards: child--------------------------
console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'yellow';

///// Going Upwords: parents ----------------
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background =
  'var(--gradient-primary)';


/////// Going Sideways : Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)'
});

*/

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e)
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });











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


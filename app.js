/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navBar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('main > section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build The Nav

function buildMenu() {
  for(let i=0; i<sections.length; i++) {
    let listItemText = sections[i].querySelector('h2').innerText;
    let listItem = document.createElement('li');
    
    listItem.classList.add('menu__link');
    listItem.innerHTML = listItemText;
    
    navBar.appendChild(listItem);
  }
}

// Hide The Nav Bar

function hideNavBar() {
  const elem = document.querySelector('.page__header');
  let timer = null

  window.addEventListener('scroll', () => {
    if(timer !== null) {
      clearTimeout(timer);
      elem.setAttribute('style', "visibility: visible;");
    }
    timer = setTimeout( () => {
      elem.setAttribute('style', "visibility: hidden;");
    }, 3000);
  });
}

// Add class 'active' to section when near top of viewport

function update() {
  let rect = document.querySelectorAll('main > section');
  const listItemScroll = document.querySelectorAll('#navbar__list li');

  for(let i=0; i<sections.length; i++) {
    if(rect[i].getBoundingClientRect()['top'] < 200 && rect[i].getBoundingClientRect()['bottom'] > 400) {
    sections[i].classList.add('active');
    listItemScroll[i].classList.add('activeListItem');
    } else {
    sections[i].classList.remove('active');
    listItemScroll[i].classList.remove('activeListItem');
    }
  }
}

// Scroll to anchor ID using scrollTO event

function sectionScrolling() {
  const listItemScroll = document.querySelectorAll('#navbar__list li');
  
  for(let i=0; i<sections.length; i++) {
    listItemScroll[i].addEventListener('click', () => {
        sections[i].scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Scroll to top

function topScrolling() {
  const topScroll = document.querySelector('html');
  const scrollButton = document.querySelector('.scrollToTop img');
  document.addEventListener('scroll', () => {
      if(sections[0].getBoundingClientRect().top <= -250) {
          scrollButton.setAttribute('style', "display: unset");
      } else {
          scrollButton.setAttribute('style', "display: none");
      }
  });
  scrollButton.addEventListener('click', () => {
    topScroll.scrollIntoView({ behavior: "smooth" });
  });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

buildMenu();

// Scroll to section on link click

sectionScrolling();

// Scroll to top

topScrolling();

// Hide Nav Bar

hideNavBar();

// Set sections as active

document.addEventListener('scroll', update);
update();
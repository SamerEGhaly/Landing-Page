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

let sections; // to hold the list of sections in the page
let navList;  // to hold the navigation bar list
let navButtons; // to hold list items of navigation bar

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function initNavBar() // build the navigation bar according to the page sections
{
    let docFrag = document.createDocumentFragment(); 
    let navBarList = document.querySelector("#navbar__list"); // access the empty navigation bar list
    for(let i = 0; i < sections.length; i++) // looping over the list of sections
    {
        let sectionHeader = sections[i].firstElementChild.firstElementChild; // access section header
        let listElement = document.createElement("li"); // create a new list element to act as a button in the navigation list
        listElement.innerHTML = "<a href=\"#" + sections[i].id + "\"> " + sectionHeader.textContent + " </a>"; // link the button to a section and name it after the sectoin header
        listElement.classList.add("menu__link"); // add the button to the .menu__link class to apply CSS
        docFrag.appendChild(listElement); // append the button to the fragment
    }
    navBarList.appendChild(docFrag); // add the created list elements to the navigattion list in one step to avoid multiple reformatoins
}

function findTopSection() // find the section nearest to the top of the page and return its index in the sections list
{
    // assume the first section is the nearest to the top and initialize the variable accordingly
    let activeSectionIndex = 0;
    let distToTop = Math.abs(sections[0].getBoundingClientRect().top); // holds the absolute distance of current section to the top of the viewport
    let minDistToTop = distToTop; // holds the minimum absolute distance to top recorded
    for(let i = 1; i < sections.length; i++)
    {
        distToTop = Math.abs(sections[i].getBoundingClientRect().top);
        if(distToTop < minDistToTop) // update the minimum distance to top recorded if a new minimum is found and update the active sectoin index
        {
            minDistToTop = distToTop;
            activeSectionIndex = i;
        }
    }
    return activeSectionIndex;
}

function setActiveSection() // finds the nearest section to the viewport top and adds it to the .your-active-class class to apply css
{
    const newIndex = findTopSection();
    const activeSection = document.querySelector("section.your-active-class"); // find current active section
    let oldIndex = Number((activeSection.getAttribute("data-nav").split(" "))[1]) - 1; // extract the section number from its data-nav attribute and calculate its index in the sections list
    sections[newIndex].classList.add("your-active-class");
    navButtons[newIndex].classList.add("your-active-class");
    if(oldIndex != newIndex) // if the top section and the active section are not the same, change their states by adjusting their classLists
    {
        navButtons[oldIndex].classList.remove("your-active-class");
        sections[oldIndex].classList.remove("your-active-class");
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

sections = document.querySelectorAll("section");
navList = document.querySelector("#navbar__list");

// build the navigation bar
initNavBar();
navButtons = document.querySelectorAll(".menu__link");
// Add class 'active' to section when near top of viewport

setActiveSection(); // set the active section at the beginning
window.addEventListener("scroll", setActiveSection); // listen for page scrolling to to set active section

navList.addEventListener("click", function(event){  // listen for clicks on the navigttion bar
    let section; // will hold the section element to navigate to
    let sectionRect; // will hold the rect of the section element
    event.preventDefault();
    section = document.querySelector(event.target.getAttribute("href")); // query the section using the href attribute of the link clicked which holds the id of the section
    if(section) // if a section is found
    {
        sectionRect = section.getBoundingClientRect();
        window.scrollBy({ // scroll to the top of the section smoothly
            top: sectionRect.top,
            left: sectionRect.left,
            behavior: "smooth"
        })
    }
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active



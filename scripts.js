/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

function updateDescription(count) {
  const description = document.getElementById("hikes-description");
  if (!description) {
    return;
  }
  description.textContent = count + " of SoCal's best hikes tailored FOR YOU by Matthew Gonzalez";
}

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");
  for (let i = 0; i < hikes.length; i++) {
    let hike = hikes[i];
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, hike); // Edit card
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
  updateDescription(hikes.length); //update the description to show the number of hikes in the array
}

function showCardsLimited(hikeList){ //function to show an array of hikes, will allow me to show limited hieks rather than complete list because of parameter
  //same exact fuinction as previous functio but just with a optional parameter
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");
  for (let i = 0; i < hikeList.length; i++) {
    let hike = hikeList[i];
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, hike); // Edit card
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
  updateDescription(hikeList.length);
}

function FilterSort() {
  //filter through tags
  const checkedBoxes = document.querySelectorAll('#checkbox-container input:checked'); //find all checked boxes within the filter tags
  let temptags = [];
  for(let i = 0; i < checkedBoxes.length; i++){
    temptags[i] = checkedBoxes[i].value; //add the values or tags of the checked boxes to an array because its intially stored in a nodelist
  }
  let hikeList = hikes.filter(h => { //loop through every tag
    return temptags.every(tag => h.tags.includes(tag)); //appends hike if every tag in temp tags is contained in the hike's tags
  });

  //sort ascending or descending
  const sortValue = document.getElementById("sort-select").value;
  if (sortValue === "dist-asc") {
    hikeList.sort((a, b) => a.distance - b.distance);
  } else if (sortValue === "dist-desc") {
    hikeList.sort((a, b) => b.distance - a.distance);
  } else if (sortValue === "elev-asc") {
    hikeList.sort((a, b) => a.elevationGain - b.elevationGain);
  } else if (sortValue === "elev-desc") {
    hikeList.sort((a, b) => b.elevationGain - a.elevationGain);
  }

  //display new lsit
  showCardsLimited(hikeList);
}

function randomHike(){
  const randomIndex = Math.floor(Math.random() * hikes.length); //will return an integer between 1 and hikes.length
  const hike = hikes[randomIndex]; //find the value in our array of hikes
  showCardsLimited([hike]); //put value in an array and display it
}

function resetHikes() {
  const searchInput = document.getElementById("search-input"); //clear search bar
  if (searchInput) { //check if theres a value in search input
    searchInput.value = "";
  }
  const allCheckboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
  allCheckboxes.forEach(box => {
    box.checked = false; //uncheck all boxes
  });
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = "none"; //reset sort
  }

  showCards(); //display original list
}

function searchHikes(){
  const searchVal = document.getElementById("search-input").value.toLowerCase(); //save value stored in search-input and make it lower case
  const allCheckboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
  allCheckboxes.forEach(box => {
    box.checked = false; //uncheck all boxes
  });
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = "none"; //reset sort
  }
  let hikeList = hikes.filter(h => {
    const nameMatch = h.name.toLowerCase().includes(searchVal); //see if any hike's names match with our stored value
    const locationMatch = h.location.toLowerCase().includes(searchVal);
    return nameMatch || locationMatch;
  })
  showCardsLimited(hikeList);
}

function editCardContent(card, hike) {
  card.style.display = "flex";
  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = hike.name;
  const listItems = card.querySelectorAll("li");
  listItems[0].textContent = `Distance: ${hike.distance} miles`;
  listItems[1].textContent = `Elevation: ${hike.elevationGain} ft`;
  listItems[2].textContent = `Location: ${hike.location}`;

  const cardImage = card.querySelector("img");
  cardImage.src = hike.image;
  cardImage.alt = "Photo of " + hike.name;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", hike.name, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function removeLastCard() {
  hikes.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

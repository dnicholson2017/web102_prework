/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// Print length of games data array to console
console.log('Length of games',GAMES_JSON.length)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (var i=0; i < games.length; i++) {
        
        console.log(games[i]);
        console.log('Adding the object', obj);
        var obj = `<div class='game-card'> \
                <p>${games[i].name}</p> \
                <img class='game-img' src='${games[i].img}'>\
                <p>${games[i].description}</p> \
                </div>`
        
        var el = document.createElement("div")
        el.innerHTML = obj
        gamesContainer.appendChild(el)
    }
    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers
}, 0)

console.log("totalContributions", totalContributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML=totalContributions.toLocaleString('en-US')

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = '$' + totalRaised.toLocaleString('en-US')

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length
gamesCard.innerHTML = totalGames.toLocaleString('en-US')


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    });

    // use the function we previously created to add the unfunded games to the DOM
    console.log(unfundedGames)
    addGamesToPage(unfundedGames)
}

// Call function filterUnfundedOnly() to filter unfunded games
//filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    });

    // use the function we previously created to add unfunded games to the DOM
    console.log(fundedGames)
    addGamesToPage(fundedGames)
}

// Call function filterFundedOnly() to filter funded games
//filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", function() {
    filterUnfundedOnly()
    console.log("Button filterUnfundedOnly")
});
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", function() {
    filterFundedOnly()
    console.log("Button filterFundedOnly")
});
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function() {
    showAllGames()
    console.log("Button showAllGames")
});
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesText = unfundedGamesCount === 0
    ? "All games are funded!"
    : `There are ${unfundedGamesCount} unfunded games.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionText = `
    <p>Welcome to our crowdfunding platform. ${unfundedGamesText}</p>
`;
descriptionContainer.innerHTML = descriptionText;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restOfGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('div');
firstGameElement.innerHTML = `
    <p>${firstGame.name}</p>
    <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
    <img src="${firstGame.img}" alt="${firstGame.name}" class="game-img">
`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner-up item
const secondGameElement = document.createElement('div');
secondGameElement.innerHTML = `
    <p>${secondGame.name}</p>
    <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
    <img src="${secondGame.img}" alt="${secondGame.name}" class="game-img">
`;
secondGameContainer.appendChild(secondGameElement);

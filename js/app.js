//Select the .deck ul element
const deck = document.querySelector(".deck");
//Select the moves counter
const moves = document.querySelector(".moves");
//Moves counter value
let counter = 0;
//Time value in seconds
let time = 0;

/*
 * Create a list that holds all of your cards
 */
let cards = [];
let icons = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"
];
for(let i = 0; i <16; i++){
    let card = document.createElement("li");
    let icon = document.createElement("i");
    card.classList.add("card");
    // card.classList.add("show");
    icon.classList.add("fa");
    icon.classList.add(icons[i]);
    card.appendChild(icon);
    cards.push(card);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
cards.forEach((val) => {
    deck.appendChild(val);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 //Array to hold currently open cards
let openCards = [];

//Displays card's symbol when clicked
let showCard = (e) => {
    const target = e.target;
    let card;
    if(target.nodeName === "LI"){
        card = event.target;
    } else if(target.nodeName === "I"){
        card = event.target.parentElement;
    }
    if(!card.classList.contains("show")){
        card.classList.add("show");
        card.classList.add("open");
    }
}

//Adds cards to openCards array IF they aren't already in it
let addToOpen = (event) => {
    const target = event.target;
    let card;
    if(target.nodeName === "LI"){
        card = event.target;
    } else if(target.nodeName === "I"){
        card = event.target.parentElement;
    }
    //Check to see if the second click is on the same card. If not, add it to the array.
    const arrIndex = openCards.indexOf(card);
    if(arrIndex === -1){
        openCards.push(card);
    }
}

//Hide card and remove from openCards array if not a match
let hideAndRemove = (e) => {
    const prevOpen = openCards[openCards.length - 2];
    const currentOpen = openCards[openCards.length - 1];
    prevOpen.classList.remove("show");
    prevOpen.classList.remove("open");
    currentOpen.classList.remove("show");
    currentOpen.classList.remove("open");
    openCards.splice(openCards.length -2, 2);
}

//Adds match class to matched cards
let addMatch = (c) => {
    let matched = openCards.filter(function(val){
        return val.firstChild.classList[1] === c;
    });
    matched.forEach(function(val){
        val.classList.add("match");
    });
}

//Click event listener for ul
deck.addEventListener("click", function(event){
    const previousIcons = openCards.map(function(val){
        return val.firstChild.classList[1];
    });
    showCard(event);
    addToOpen(event);
    // showOrHide(ev sent);
    //Check to see if two open cards match
    if(openCards[1] && openCards.length%2 === 0){
        //Increment counter to show completed "move"
        addCounter();
        //Select current card and its icon
        const currentCard = openCards[openCards.length - 1];
        const currentIcon = currentCard.firstChild.classList[1];
        //If it is a match, add .match class to cards
        //If it's the last match, game is won
        if(previousIcons.indexOf(currentIcon) !== -1){
            addMatch(currentIcon);
            if(openCards.length===16){
                console.log("Congrats! You won!!");
            }
        //If it's not a match, remove the cards
        } else if(previousIcons.indexOf(currentIcon) === -1){
            console.log("It's not a match");
            hideAndRemove(event);
        }
    }
});

//Select DOM .moves, which displays number of moves
let moveSpan = document.querySelector(".moves");

//Increment counter when a move is made and display new value on page
let addCounter = () => {
    //Increment counter to indicate current number of completed moves
    counter++;
    //Update DOM display of moves
    moveSpan.textContent = counter;
};

//Select reset button
let resetBtn = document.querySelector(".restart");
//Restart button functionality
resetBtn.addEventListener("click", function(event){
    //Empty out old cards from ul element
    while(deck.firstChild){
        deck.removeChild(deck.firstChild);
    }
    //Shuffle card order and render new cards in ul element
    shuffle(cards);
    cards.forEach((val) => {
        deck.appendChild(val);
    });
    //Reset number of moves made
    //Reset counter
    counter = 0;
    //Update DOM display of moves
    moveSpan.textContent = counter;
});

//Create and manage timer -- will happen only on first card click after page load or restarting
deck.addEventListener("click", startTimer);
function startTimer(){
    //Select div to add timer to
    const scorePanel = document.querySelector(".score-panel");
    //Create timer label
    let timeAndLabel = document.createElement("h3");
    //Set timeAndLabel's content
    timeAndLabel.innerHTML = "Timer: " + time;
    //Add timer to scorePanel
    scorePanel.insertAdjacentElement("beforebegin", timeAndLabel);
    setInterval(addSecond, 1000, timeAndLabel);
    // removeEventListener("click", startTimer);
}

//Increments timer by 1 second
function addSecond(timer){
    time++;
    timer.innerHTML = "Timer: " + time;
}

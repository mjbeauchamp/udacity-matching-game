//Select the .deck ul element
const deck = document.querySelector(".deck");
//Select the moves counter
const moves = document.querySelector(".moves");
//Moves counter value
let counter = 0;

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
//Array to hold successful matches
//This allows you to keep track of what cards have already been successfully matched
//Knowing this, you can easily tell if a clicked card has already been matched or not,
//which lets you identify a clicked unmatched card.
let matchedCards = [];
//Array to hold two cards that are currently being checked against each other
let checkCards = [];

//Displays card's symbol when clicked
//Adds card to checkCards array
let showCard = (e) => {
    const target = e.target;
    let card;
    if(target.nodeName === "LI"){
        card = event.target;
    } else if(target.nodeName === "I"){
        card = event.target.parentElement;
    }
    //If the card isn't already being "shown" as visible, take the following actions
    if(!card.classList.contains("show")){
        card.classList.add("show");
        card.classList.add("open");
        //add card to checkCards array
        checkCards.push(card);
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
//Add cards to checkMatch array if they are being compared
let addCheckMatch = (event) => {
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
    //Remove card from checkCards array
    checkCards.pop();
    checkCards.pop();
}

//Adds match class to matched cards
//Also adds matched cards to matchedCards array
//Also removes all cards from checkCards array
let addMatch = (icon, card) => {
    let matched = openCards.filter(function(val){
        return val.firstChild.classList[1] === icon;
    });
    //Iterate move counter if the card isn't already in matchedCards array
    if(matchedCards.indexOf(card)===-1){
        addCounter();
    }
    //Handle each card
    matched.forEach(function(val){
        //Add .match class to newly matched cards
        val.classList.add("match");
        //Add newly matched cards to matchedCards array if they aren't already there
        //Increment turn counter
        if(matchedCards.indexOf(val) === -1){
            matchedCards.push(val);
        }
        //Remove card from checkCards array
        checkCards.pop();
    });
}
/*************** Card Click Event Listener ******************/
//Click event listener for ul
deck.addEventListener("click", function(event){
    if(event.target.nodeName === "LI" || event.target.nodeName === "I"){
        if(!checkCards[1]){
            const previousIcons = openCards.map(function(val){
                return val.firstChild.classList[1];
            });
            showCard(event);
            addToOpen(event);
            // showOrHide(ev sent);
            //Check to see if array has even number of cards, so last two should be compared
            if(openCards[1] && openCards.length%2 === 0){
                //Select current card and its icon
                const currentCard = openCards[openCards.length - 1];
                const currentIcon = currentCard.firstChild.classList[1];
                //If it is a match, add .match class to cards and increment move counter
                if(previousIcons.indexOf(currentIcon) !== -1){
                    if(matchedCards.indexOf(currentCard) === -1){
                        addMatch(currentIcon, currentCard);
                    }
                    //If it's the last match, game is won
                    if(openCards.length===16){
                        console.log("Congrats! You won!!");
                    }
                //If it's not a match, remove the cards and increment move counter
                } else if(previousIcons.indexOf(currentIcon) === -1){
                    console.log("It's not a match");
                    //Increment counter to show completed "move"
                    addCounter();
                    //Hide cards and remove from openCards array, after giving user enough time to view
                    setTimeout(hideAndRemove, 2300, event);
                }
            }
        }
    }
});

//*************** Move counter functionality *******************
//Select DOM .moves, which displays number of moves
let moveSpan = document.querySelector(".moves");

//Increment counter when a move is made and display new value on page
let addCounter = () => {
    //Increment counter to indicate current number of completed moves
    counter++;
    //Update DOM display of moves
    moveSpan.textContent = counter;
};

//***********TIMER FUNCTIONALITY**************
//Define times
let seconds = 0;
let minutes = 0;
let hours = 0;
//Declare initial setInterval VARIABLE
let interval;


//Create and manage timer -- will happen only on first card click after page load or restarting
deck.addEventListener("click", initialTimer);

//****************** Reset Button Funcitonality ***********************/
//Select reset button
let resetBtn = document.querySelector(".restart");
//Restart button functionality
resetBtn.addEventListener("click", function(event){
    //Empty out cards from all tracking arrays-- openCards, matchedCards, checkCards
    while(openCards[0]){
        openCards.pop();
    }
    while(matchedCards[0]){
        matchedCards.pop();
    }
    while(checkCards[0]){
        checkCards.pop();
    }
    // //Flip all cards back over
     cards.forEach((val, i, a) => {
        a[i].classList.remove("open");
        a[i].classList.remove("show");
        a[i].classList.remove("match");
    });
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
    //Reset timer
    if(document.querySelector(".timer")){
        let timer = document.querySelector(".timer");
        timer.remove();
        clearInterval(interval);
        seconds = 0;
        minutes = 0;
        hours = 0;
        deck.addEventListener("click", initialTimer);
    }
});

//Will run startTimer() ONLY on first card click
function initialTimer(){
    startTimer();
    deck.removeEventListener("click", initialTimer);
}

//Starts Timer
function startTimer(){
    createTimer();
    let timeAndLabel = document.querySelector(".timer");
    interval = setInterval(addSecond, 1000, timeAndLabel);
}

//Sets starting timer state
function createTimer(){
    //Create initial time value
    let currentTime = makeTime();
    //Select div to add timer to
    const scorePanel = document.querySelector(".score-panel");
    //Create timer label
    let timeAndLabel = document.createElement("h3");
    //Add timer classs
    timeAndLabel.classList.add("timer");
    //Set timeAndLabel's content
    timeAndLabel.innerHTML = "Timer: " + currentTime;
    //Add timer to scorePanel
    scorePanel.insertAdjacentElement("beforebegin", timeAndLabel);
}

//Make displayed time
let makeTime = () => {
    if(seconds>59){
        minutes++;
        seconds = 0;
    }
    if(minutes>59){
        hours++;
        minutes = 0;
    }
    let showSeconds = seconds;
    let showMinutes = minutes;
    let showHours = hours;
    if(seconds<10){
        showSeconds = "0" + seconds;
    }
    if(minutes<10){
        showMinutes = "0" + minutes;
    }
    if(hours<10){
        showHours = "0" + hours;
    }
    let time = showHours + ":" + showMinutes + ":" + showSeconds;
    return time;
}

//Increments timer by 1 second
function addSecond(timer){
    seconds++;
    let myTime = makeTime()
    timer.innerHTML = "Timer:" + myTime;
}

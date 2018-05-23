//Select the .deck ul element
const deck = document.querySelector(".deck");
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
        target.classList.add("show");
    }
}

 //Shows or hides card in DOM and adds or removes it from openCards array
let showOrHide = (e) => {
    const target = e.target;
    if(target.nodeName === "LI"){
        if(!target.classList.contains("show")){
            // addToOpen(e);
            // target.classList.add("show");
        } else if(target.classList.contains("show")){
            //Search array to see if it currently contains this card
            var arrIndex = openCards.indexOf(target);
            //Remove card from array
            openCards.splice(arrIndex, 1);
            //Remove show class to hide card
            target.classList.remove("show");
        }
    } else if(target.nodeName === "I"){
        if(!target.parentElement.classList.contains("show")){
            // addToOpen(e);
            target.parentElement.classList.add("show");
        } else if(target.parentElement.classList.contains("show")){
            //Search array to see if it currently contains this card
            var arrIndex = openCards.indexOf(target.parentElement);
            //Remove card from array
            openCards.splice(arrIndex, 1);
            //Remove show class to hide card
            target.parentElement.classList.remove("show");
        }
    }
};

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

//Click event listener for ul
deck.addEventListener("click", function(event){
    showCard(event);
    addToOpen(event);
    // showOrHide(event);
    //Check to see if two open cards match
    if(openCards[1]){
        const firstCard = openCards[0];
        const secondCard = openCards[1];
        const firstIcon = firstCard.firstChild.classList[1];
        if(secondCard.firstChild.classList.contains(firstIcon)){
            console.log("It's a match");
        }
    }
});



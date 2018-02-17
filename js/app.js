/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
/* scores the deck of cards */
const cardDeck = document.querySelector(".deck");

/* nodelist of all cards */
let cardStack = document.querySelectorAll(".card");

/* creates array initialized to cardStack */
let cardArray = [...cardStack];

/* initial moves count */
let moves = 0;

/* accesses the "moves" class to set up event listeners */
let count = document.querySelector(".moves");

/* adds stars to array for rating */
const starCount = document.querySelectorAll(".fa-star");

let matchList = 0;
console.log(matchList);

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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 /**
 * @description: calls the shuffle function and displays all cards face down
 */
function displayCards() {
   cardArray = shuffle(cardArray);
   let tempHolder= [];
   for (let i=0; i < cardArray.length; i++) {
     cardDeck.innerHTML ="";
    tempHolder.forEach.call(cardArray, function(item){
      cardDeck.appendChild(item);
    });
    cardArray[i].classList.remove("show", "open", "match");
   }
   moves =0;
   count.innerHTML = 0;
   for (let i=0; i < starCount.length; i++){
     starCount[i].style.visibility = "visible";
   }
   /*starts/restarts timer */
   clearInterval(timePassed);
   hour =0;
   minute=0;
   second =0;
   timer.innerHTML = hour + "hours " + minute + "mins " + second + "secs";
   gameTime();
 }
 /**
 * @description: changes .restart to a clickable event which triggers the
 * function displayCards
 */
 let replayGame= document.querySelector(".restart");
replayGame.onclick = displayCards;

/* suffles and displays cards face down upon game load */
document.body.onload = displayCards;
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
/* array to hold open cards */
let openCards = [];
/**
* @description: open and compare cards
*opens the cards and pushes it into the array.
* Compares cards and then changes the clicked cards according to whether
* they match.  Currently using console.log to verify card placement into
* openCards and verify if statements
*/
let openCard = function(){
  this.classList.toggle("open");
  this.classList.toggle("show");
  openCards.push(this);
  let cardCount = openCards.length;
  if (cardCount === 2) {
    movesCounter();
    if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
      matchList++;
      console.log(matchList);
      for (let i=0; i < 2; i++){
        openCards[i].classList.add("match");
        openCards[i].classList.remove("show", "open");
      }
      openCards = [];
    } else {
        notMatch();
    }
  }
  finished();
}
/**
/* @description: sets delay when cards don't match and flips over
*/
function notMatch(){
  setTimeout(function(){
    for (let i=0; i < openCards.length; i++){
      openCards[i].classList.remove("show", "open");
    }
    openCards = [];
  }, 1200);
}
/**
* @description: Adds 1 each time 2 cards are clicked and updates the moves
* in index.html. Tracks moves and adjusts star rating.
*/
function movesCounter(){
  moves ++;
  count.innerHTML = moves;
  if (moves < 30 && moves > 24){
    starCount[2].style.visibility = "collapse";
  } else if (moves > 30){
      starCount[1].style.visibility = "collapse";
  }
}
/**
* @description: game timer
*/
let timePassed;
let timer = document.querySelector(".gameTimer");
let second = 0;
let minute = 0;
let hour = 0;

function gameTime(){
  timePassed = setInterval(function(){
    timer.innerHTML = hour + "hours " + minute + "mins " + second + "secs";
    second ++;
    if (second == 60){
      minute ++;
      second =0;
    }
    if (minute == 60){
      hour++;
      minute = 0;
    }
  }, 1000);
}
/**
* @description: modal for when all cards are matched
*/
let endStar= document.querySelector(".rating");

/*accesses the ending time for the modal display */
let endTime = document.querySelector(".endTime");

/*accesses the amount of moves for the modal display */
let endMoves = document.querySelector(".totalMoves");
/* accesses stars to set up for modal*/
let starList = document.querySelector(".stars");


//TODO fix function and replay button for timer to continue working
//TODO change 1 to 8
function finished() {
  if (matchList === 1){
    endTime.innerHTML = timer.innerHTML;
    endMoves.innerHTML = count.innerHTML;
    endStar.innerHTML = starList.innerHTML;
  }
}

let replayButton = document.querySelector(".replay");
replayButton.onclick = displayCards;

/**
* @description: loops through the cards and adds event listeners
*/
for (let i=0; i <cardArray.length; i++){
  cardStack= cardArray[i];
  cardStack.addEventListener("click", openCard);
}

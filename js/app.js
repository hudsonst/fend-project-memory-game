/*
 * Create a list that holds all of your cards
 */
const allCards = Array.from(document.querySelectorAll('.card'));
const deck = document.querySelector('.deck');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const shuffledCards = shuffle(allCards);
const cardFragment = document.createDocumentFragment();

for (let i = 0; shuffledCards.length > i; i++) {
    console.log(shuffledCards[i]);
    const newCard = shuffledCards[i];
    cardFragment.appendChild(newCard);
};

deck.appendChild(cardFragment);

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
let matchcounter = 0;
let moves = 0;
let lastCard = '';
let time = 0;
let starCount = 3;
let cardArray = ['default']; //Set to dummy value 
let displayTimeInt = 0;


function startGame(event) {
    const card = event.target;
    showSymbol(card);
    compareCards(card);
    incrementMoves();
}

function showSymbol(card) {
    card.classList.add('open', 'show');
}

function compareCards(card) {
    let currentCard = cardArray[0];
    if (currentCard === 'default') {
        cardArray.pop();
        cardArray.push(card);
    } else if (currentCard === card) {
        console.log("same card");
        return;
    } else if (currentCard.innerHTML === card.innerHTML) {
        card.classList.add('match');
        currentCard.classList.add('match');
        matchcounter++;
        countMatches();
        cardArray.splice(0, 1, 'default');
    } else if (currentCard.innerHTML !== card.innerHTML) {
        setTimeout(function() {
            currentCard.classList.remove('open', 'show');
            card.classList.remove('open', 'show');
        }, 1000);
        cardArray.splice(0, 1, 'default');
    }
}


function incrementMoves() {
    moves++;
    let moveNum = Array.from(document.querySelectorAll('.moves'));
    moveNum.forEach(function(e) {
        if (moves === 1) {
            e.textContent = moves + ' move';
        } else {
            e.textContent = moves + ' moves';
        }
    })

    const score = document.querySelector('.stars');
    const star = score.firstElementChild;
    if (moves >= 91) {
        score.removeChild(star);
        starCount = 0;
    }
    if (moves === 61) {
        score.removeChild(star);
        starCount = 1;
    }
    if (moves === 31) {
        score.removeChild(star);
        starCount = 2;
    }

}

function countMatches() {
    const modal = document.querySelector('.modal');
    if (matchcounter === 8) {
        stopTimer();
        const final = document.querySelector('.modal .moves');
        final.textContent = moves;
        const finalTime = document.querySelector('#timer');
        finalTime.textContent = time;
        const starCountFinal = document.querySelector('#starCount');
        if (starCount === 1) {
            starCountFinal.textContent = starCount + ' star';
        } else {
            starCountFinal.textContent = starCount + ' stars';
        }
        modal.style.display = 'block';
    }
}

function startTimer() {
    time = setInterval(function() {
        ++time;
    }, 1000);
    displayTimer();
}

function displayTimer(){
    const displayTime = document.querySelector('.displayTime');
    displayTimeInt = setInterval(display, 1000);
    function display() {
        displayTime.textContent = time + ' seconds';
    }
}

function stopTimer() {
    clearTimeout(time);
    clearTimeout(displayTimeInt);
}

deck.addEventListener('click', startTimer, { once: true });

deck.addEventListener('click', startGame);